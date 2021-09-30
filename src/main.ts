import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as winston from 'winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const logger = winston.createLogger({
  level:'info',
  format: winston.format.json(),
  defaultMeta: {service: 'ugum-saas'},
  transports: [
    new winston.transports.File({filename: 'error.log', level: 'error'}),
    new winston.transports.File({filename: 'combined.log'}),
  ]
})

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const options =new DocumentBuilder()
    .setTitle("Internship Application")
    .setDescription("Application developed as teaching aid for Internship")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  
  SwaggerModule.setup('api', app, document);


  
  await app.listen(3000);
  logger.info(`Application is running on: ${await app.getUrl()}`)
}
bootstrap();
