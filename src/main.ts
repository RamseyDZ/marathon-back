import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const PORT = parseInt(process.env.PORT, 10) || 3456; 

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	// Connect to DB 

	app.enableCors({ origin: '*' })
	app.useGlobalPipes(new ValidationPipe({
			transform: true
		})
	)
	app.enableVersioning({ type: VersioningType.URI })
	app.use(helmet())
	app.use(compression())

	const config = new DocumentBuilder()
		.setTitle('Marathons server')
		.setDescription('The marathon API description')
		.setVersion('1.0')
		.addTag('marathon')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('swagger', app, document);
	await app.listen(PORT, () => {
		console.log(`🚀 Application running at port ${PORT}`)
	});
}

bootstrap();
