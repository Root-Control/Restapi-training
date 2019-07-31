import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { EnvironmentService } from './environment.variables';
import { AppModule } from './app.module';

import { join } from 'path';

import * as chalk from 'chalk';
const log = chalk.default;

async function bootstrap() {
    const environment = new EnvironmentService('.env');
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors();
    app.setGlobalPrefix('api');
    app.useStaticAssets(join(__dirname, '/../public'));

    await app.listen(environment.get('HTTP_SERVER_PORT'));
    console.log(log.yellow('[Store] V.1.0   -'));
    console.log(`Environment -> ${environment.get('NODE_ENV')}`);
    console.log(`Port -> ${environment.get('HTTP_SERVER_PORT')}`);
}
bootstrap();
