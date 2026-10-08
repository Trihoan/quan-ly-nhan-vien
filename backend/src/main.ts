import "reflect-metadata";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api");
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true
        })
    );
    await app.listen(Number(process.env.NEST_PORT || 5002), "127.0.0.1");
    console.log(`NestJS API listening on http://127.0.0.1:${process.env.NEST_PORT || 5002}/api`);
}

void bootstrap();
