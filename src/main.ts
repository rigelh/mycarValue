import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session')
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['asdfasfad']
  }))
app.useGlobalPipes(
  new ValidationPipe({
    // white list set to true tregon se per te dhenat jo te deklaruar ne dto beji move from the validationpipe
    whitelist:true
  })
)
  await app.listen(3000);
}
bootstrap();
