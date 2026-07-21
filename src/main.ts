import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  // // ✅ Enable CORS
  // const frontendDomain:any =[configService.get<string>('FRONTEND_DOMAIN', )

  

   const allowedOrigins = [
    'http://localhost:8081',
    '*',
  ];

  app.enableCors({
   origin: allowedOrigins,
    methods: ['GET', 'HEAD', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // ✅ Global API prefix
  app.setGlobalPrefix(configService.get<string>('API_PREFIX') ?? 'ocsapi');

  // ✅ Swagger Configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('OCS  API')
    .setDescription('API documentation for OCS system')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('ocsdoc', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  // ✅ Use dynamic port (required for Render/Heroku)
  const port = Number(process.env.PORT) || 3010;
  await app.listen(port);

  console.log(`🚀 Server running on port ${port}`);
  console.log(`📑 Swagger docs available at /ocsdoc`);
}

bootstrap();
