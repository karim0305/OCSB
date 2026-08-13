"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const crypto_1 = require("crypto");
const jwt_1 = require("@nestjs/jwt");
const google_auth_library_1 = require("google-auth-library");
const twilio = require("twilio");
const user_schema_1 = require("../schema/user.schema");
const nodemailer = require("nodemailer");
const googleClient = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
let AuthService = class AuthService {
    userModel;
    jwtService;
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async login(email, password) {
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            throw new common_1.NotFoundException({
                message: '❌ User not found',
                field: 'email',
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.BadRequestException({
                message: '❌ Invalid password',
                field: 'password',
            });
        }
        if (user.status !== 'Active') {
            throw new common_1.ForbiddenException({
                message: '❌ Your account has been deleted. Please contact support.',
                field: 'status',
            });
        }
        const payload = { sub: user._id, email: user.email };
        const token = this.jwtService.sign(payload);
        const { password: _, ...userWithoutPassword } = user.toObject();
        return {
            access_token: token,
            user: userWithoutPassword,
        };
    }
    async sendOtp(email) {
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            throw new common_1.NotFoundException({
                message: ' User not found',
                field: 'email',
            });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
        await user.save();
        await this.sendOtpEmail(user.email, otp);
        return { message: 'OTP sent successfully' };
    }
    async sendOtpEmail(email, otp) {
        const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM } = process.env;
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
    async verifyOtp(email, otp) {
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            throw new common_1.NotFoundException({
                message: ' User not found',
                field: 'email',
            });
        }
        if (!user.otp || !otp) {
            throw new common_1.BadRequestException({ message: ' OTP is required' });
        }
        if (user.otp !== otp) {
            throw new common_1.BadRequestException({ message: ' Invalid OTP' });
        }
        if (user.otpExpiresAt && user.otpExpiresAt.getTime() < Date.now()) {
            throw new common_1.BadRequestException({ message: ' OTP has expired' });
        }
        user.otp = undefined;
        user.otpExpiresAt = undefined;
        await user.save();
        return { message: 'OTP verified successfully', email: user.email };
    }
    async resetPassword(email, password) {
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            throw new common_1.NotFoundException({
                message: ' User not found',
                field: 'email',
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
        return { message: 'Password reset successfully' };
    }
    async googleLogin(idToken) {
        if (!idToken) {
            throw new common_1.BadRequestException({ message: 'idToken is required', field: 'idToken' });
        }
        let payload;
        try {
            const ticket = await googleClient.verifyIdToken({
                idToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            payload = ticket.getPayload();
        }
        catch (err) {
            throw new common_1.BadRequestException({ message: 'Invalid Google token' });
        }
        if (!payload?.email) {
            throw new common_1.BadRequestException({ message: 'Google account has no email' });
        }
        let user = await this.userModel.findOne({ email: payload.email }).exec();
        if (!user) {
            const randomPassword = await bcrypt.hash((0, crypto_1.randomUUID)(), 10);
            user = await this.userModel.create({
                name: payload.name || 'Google User',
                email: payload.email,
                password: randomPassword,
                phone: undefined,
                cnic: undefined,
                role: 'Customer',
                status: 'Active',
                image: payload.picture,
                authProvider: 'google',
            });
        }
        else if (user.status !== 'Active') {
            throw new common_1.ForbiddenException({
                message: '❌ Your account has been deactivated. Please contact support.',
                field: 'status',
            });
        }
        const jwtPayload = { sub: user._id, email: user.email };
        const token = this.jwtService.sign(jwtPayload);
        const { password: _, ...userWithoutPassword } = user.toObject();
        return { access_token: token, user: userWithoutPassword };
    }
    async sendPhoneOtp(phone) {
        if (!phone) {
            throw new common_1.BadRequestException({ message: 'Phone number is required', field: 'phone' });
        }
        let user = await this.userModel.findOne({ phone }).exec();
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
        if (!user) {
            const randomPassword = await bcrypt.hash((0, crypto_1.randomUUID)(), 10);
            user = await this.userModel.create({
                name: 'New User',
                email: undefined,
                phone,
                password: randomPassword,
                cnic: undefined,
                role: 'Customer',
                status: 'Inactive',
                authProvider: 'phone',
                otp,
                otpExpiresAt,
            });
        }
        else {
            user.otp = otp;
            user.otpExpiresAt = otpExpiresAt;
            await user.save();
        }
        await this.sendOtpSms(phone, otp);
        return { message: 'OTP sent successfully' };
    }
    async sendOtpSms(phone, otp) {
        const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = process.env;
        if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
            throw new Error('SMS is not configured. Please set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER.');
        }
        const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
        await client.messages.create({
            body: `Your verification code is ${otp}`,
            from: TWILIO_PHONE_NUMBER,
            to: phone,
        });
    }
    async verifyPhoneOtp(phone, otp, name) {
        const user = await this.userModel.findOne({ phone }).exec();
        if (!user) {
            throw new common_1.NotFoundException({
                message: 'No OTP request found for this phone number',
                field: 'phone',
            });
        }
        if (!user.otp || !otp) {
            throw new common_1.BadRequestException({ message: 'OTP is required' });
        }
        if (user.otp !== otp) {
            throw new common_1.BadRequestException({ message: 'Invalid OTP' });
        }
        if (user.otpExpiresAt && user.otpExpiresAt.getTime() < Date.now()) {
            throw new common_1.BadRequestException({ message: 'OTP has expired' });
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth-service.service.js.map