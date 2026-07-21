"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const dotenv = require("dotenv");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
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
    app.setGlobalPrefix(configService.get('API_PREFIX') ?? 'ocsapi');
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('OCS  API')
        .setDescription('API documentation for OCS system')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('ocsdoc', app, document, {
        swaggerOptions: { persistAuthorization: true },
    });
    const port = Number(process.env.PORT) || 3010;
    await app.listen(port);
    console.log(`🚀 Server running on port ${port}`);
    console.log(`📑 Swagger docs available at /ocsdoc`);
}
bootstrap();
//# sourceMappingURL=main.js.map