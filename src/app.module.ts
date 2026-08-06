import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './user/auth/auth-module.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { OrderModule } from './order/order.module';
import { NotificationModule } from './notification/notification.module';
 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config: Record<string, any>) => {
        if (!config.JWT_SECRET) {
          throw new Error('JWT_SECRET is required in .env');
        }
        if (!config.MONGODB_URI) {
          throw new Error('MONGODB_URI is required in .env');
        }
        if (!config.JWT_EXPIRES_IN) {
          throw new Error('JWT_EXPIRES_IN is required in .env');
        }
        if (!config.CLOUDINARY_CLOUD_NAME) {
          throw new Error('CLOUDINARY_CLOUD_NAME is required in .env');
        }
        if (!config.CLOUDINARY_API_KEY) {
          throw new Error('CLOUDINARY_API_KEY is required in .env');
        }
        if (!config.CLOUDINARY_API_SECRET) {
          throw new Error('CLOUDINARY_API_SECRET is required in .env');
        }
        return config;
      },
    }),

    // ✅ MongoDB Connection
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    AuthModule,
    UserModule,
    ProductModule,
    CartModule,
    WishlistModule,
    OrderModule,
    NotificationModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
