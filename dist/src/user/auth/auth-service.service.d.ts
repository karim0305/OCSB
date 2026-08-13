import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../schema/user.schema';
export declare class AuthService {
    private readonly userModel;
    private readonly jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    login(email: string, password: string): Promise<{
        access_token: string;
        user: any;
    }>;
    sendOtp(email: string): Promise<{
        message: string;
    }>;
    private sendOtpEmail;
    verifyOtp(email: string, otp: string): Promise<{
        message: string;
        email: string;
    }>;
    resetPassword(email: string, password: string): Promise<{
        message: string;
    }>;
    googleLogin(idToken: string): Promise<{
        access_token: string;
        user: any;
    }>;
    sendPhoneOtp(phone: string): Promise<{
        message: string;
    }>;
    private sendOtpSms;
    verifyPhoneOtp(phone: string, otp: string, name?: string): Promise<{
        access_token: string;
        user: any;
    }>;
}
