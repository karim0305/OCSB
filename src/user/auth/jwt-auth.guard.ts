// src/user/auth/jwt-auth.guard.ts
import { Injectable, ExecutionContext, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    console.log('=== GUARD canActivate CALLED ===');
    const request = context.switchToHttp().getRequest();
    console.log('=== Incoming Authorization header ===', request.headers['authorization']);
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
    console.log('=== GUARD handleRequest ===', { err, user, info });
    if (err || !user) {
      console.log('=== AUTH FAILED, info: ===', info?.message || info);
    }
    return super.handleRequest(err, user, info, context, status);
  }
}