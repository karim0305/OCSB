import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../schema/user.schema'; // 👈 adjust path
import { UserDocument } from '../schema/user.schema';
import * as nodemailer from 'nodemailer';

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
  console.log('=== SECRET AT LOGIN TIME ===', process.env.JWT_SECRET); 
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
}
