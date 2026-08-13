import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import twilio = require('twilio');
import { User } from '../schema/user.schema'; // 👈 adjust path
import { UserDocument } from '../schema/user.schema';
import * as nodemailer from 'nodemailer';

// 👇 Google client created once. GOOGLE_CLIENT_ID should be your Web client ID
// from Google Cloud Console (used to verify tokens from any platform).
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService, // 👈 inject JwtService
  ) {}

  async login(email: string, password: string): Promise<{ access_token: string; user: any }> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException({
        message: '❌ User not found',
        field: 'email',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException({
        message: '❌ Invalid password',
        field: 'password',
      });
    }

    // 👇 NEW: deactivated accounts login nahi kar sakte
    if (user.status !== 'Active') {
      throw new ForbiddenException({
        message: '❌ Your account has been deleted. Please contact support.',
        field: 'status',
      });
    }

    // 👇 JWT payload (you can add role, etc.)
    const payload = { sub: user._id, email: user.email };

    // 👇 generate token
    const token = this.jwtService.sign(payload);

    // return token + user (without password)
    const { password: _, ...userWithoutPassword } = user.toObject();

    return {
      access_token: token,
      user: userWithoutPassword,
    };
  }

  async sendOtp(email: string): Promise<{ message: string }> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException({
        message: ' User not found',
        field: 'email',
      });
    }

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // save OTP in user document
    user.otp = otp;
    // set OTP expiration (e.g., 5 minutes)
    user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    // send OTP to user email
    await this.sendOtpEmail(user.email, otp);

    return { message: 'OTP sent successfully' };
  }

  private async sendOtpEmail(email: string, otp: string): Promise<void> {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM } = process.env as Record<string, string | undefined>;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !MAIL_FROM) {
      throw new Error('Email is not configured. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and MAIL_FROM.');
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: MAIL_FROM,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is ${otp}`,
      html: `<p>Your OTP is <b>${otp}</b>.</p>`,
    });
  }

  async verifyOtp(email: string, otp: string): Promise<{ message: string; email: string }> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException({
        message: ' User not found',
        field: 'email',
      });
    }

    if (!user.otp || !otp) {
      throw new BadRequestException({ message: ' OTP is required' });
    }

    if (user.otp !== otp) {
      throw new BadRequestException({ message: ' Invalid OTP' });
    }

    if (user.otpExpiresAt && user.otpExpiresAt.getTime() < Date.now()) {
      throw new BadRequestException({ message: ' OTP has expired' });
    }

    // clear OTP after successful verification
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    return { message: 'OTP verified successfully', email: user.email };
  }

  async resetPassword(email: string, password: string): Promise<{ message: string }> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException({
        message: ' User not found',
        field: 'email',
      });
    }

    // 👇 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 👇 update user password
    user.password = hashedPassword;
    await user.save();

    return { message: 'Password reset successfully' };
  }

  // =========================================================
  // GOOGLE SIGN-IN / SIGN-UP
  // =========================================================

  /**
   * Frontend Google Sign-In se mila hua `idToken` verify karta hai,
   * agar user email se exist karta hai to login, warna naya account bana deta hai.
   */
  async googleLogin(idToken: string): Promise<{ access_token: string; user: any }> {
    if (!idToken) {
      throw new BadRequestException({ message: 'idToken is required', field: 'idToken' });
    }

    let payload;
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    } catch (err) {
      throw new BadRequestException({ message: 'Invalid Google token' });
    }

    if (!payload?.email) {
      throw new BadRequestException({ message: 'Google account has no email' });
    }

    let user = await this.userModel.findOne({ email: payload.email }).exec();

    if (!user) {
      // Naya user — password field required ho sakta hai schema me,
      // isliye ek random (kabhi use na hone wala) hashed password bana rahe hain.
      const randomPassword = await bcrypt.hash(randomUUID(), 10);

      user = await this.userModel.create({
        name: payload.name || 'Google User',
        email: payload.email,
        password: randomPassword,
        // phone/cnic Google se nahi milte — agar schema me unique index hai
        // to empty string '' duplicate key error dega, isliye undefined chhod rahe hain
        // (schema field ko optional/sparse hona chahiye — neeche note dekhein)
        phone: undefined,
        cnic: undefined,
        role: 'Customer',
        status: 'Active',
        image: payload.picture,
        authProvider: 'google', // 👈 schema me ye field add karni hogi (neeche note dekhein)
      });
    } else if (user.status !== 'Active') {
      // 👇 NEW: deactivated accounts Google se bhi login nahi kar sakte
      throw new ForbiddenException({
        message: '❌ Your account has been deactivated. Please contact support.',
        field: 'status',
      });
    }

    const jwtPayload = { sub: user._id, email: user.email };
    const token = this.jwtService.sign(jwtPayload);
    const { password: _, ...userWithoutPassword } = user.toObject();

    return { access_token: token, user: userWithoutPassword };
  }

  // =========================================================
  // PHONE OTP SIGN-IN / SIGN-UP
  // =========================================================

  /**
   * Phone pe OTP bhejta hai. Agar us phone se pehle koi user nahi hai,
   * to ek "Inactive" stub account bana deta hai jo OTP verify hone par Active ho jata hai.
   */
  async sendPhoneOtp(phone: string): Promise<{ message: string }> {
    if (!phone) {
      throw new BadRequestException({ message: 'Phone number is required', field: 'phone' });
    }

    let user = await this.userModel.findOne({ phone }).exec();

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    if (!user) {
      const randomPassword = await bcrypt.hash(randomUUID(), 10);

      user = await this.userModel.create({
        name: 'New User',
        // NOTE: email/cnic phone signup me nahi milte — agar schema me unique
        // index hai to '' duplicate key error dega, isliye undefined rakhein
        // (fields ko optional/sparse hona chahiye — neeche note dekhein)
        email: undefined,
        phone,
        password: randomPassword,
        cnic: undefined,
        role: 'Customer',
        status: 'Inactive', // OTP verify hone tak inactive
        authProvider: 'phone',
        otp,
        otpExpiresAt,
      });
    } else {
      user.otp = otp;
      user.otpExpiresAt = otpExpiresAt;
      await user.save();
    }

    await this.sendOtpSms(phone, otp);

    return { message: 'OTP sent successfully' };
  }

  private async sendOtpSms(phone: string, otp: string): Promise<void> {
    const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } =
      process.env as Record<string, string | undefined>;

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
      throw new Error(
        'SMS is not configured. Please set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER.',
      );
    }

    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    await client.messages.create({
      body: `Your verification code is ${otp}`,
      from: TWILIO_PHONE_NUMBER,
      to: phone,
    });
  }

  /**
   * Phone OTP verify karta hai. Success par account "Active" ho jata hai
   * (agar naya tha) aur JWT return karta hai — same shape jaisa normal login.
   */
  async verifyPhoneOtp(
    phone: string,
    otp: string,
    name?: string,
  ): Promise<{ access_token: string; user: any }> {
    const user = await this.userModel.findOne({ phone }).exec();

    if (!user) {
      throw new NotFoundException({
        message: 'No OTP request found for this phone number',
        field: 'phone',
      });
    }

    if (!user.otp || !otp) {
      throw new BadRequestException({ message: 'OTP is required' });
    }

    if (user.otp !== otp) {
      throw new BadRequestException({ message: 'Invalid OTP' });
    }

    if (user.otpExpiresAt && user.otpExpiresAt.getTime() < Date.now()) {
      throw new BadRequestException({ message: 'OTP has expired' });
    }

    user.otp = undefined;
    user.otpExpiresAt = undefined;
    user.status = 'Active';
    if (name) {
      user.name = name;
    }
    await user.save();

    const payload = { sub: user._id, email: user.email };
    const token = this.jwtService.sign(payload);
    const { password: _, ...userWithoutPassword } = user.toObject();

    return { access_token: token, user: userWithoutPassword };
  }
}
