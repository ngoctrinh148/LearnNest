import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  const config = new DocumentBuilder()
      .setTitle('Server Example')
      .setDescription('The Server API description')
      .setVersion('1.0')
      .addTag('Server')
      .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3030);
}
bootstrap();
