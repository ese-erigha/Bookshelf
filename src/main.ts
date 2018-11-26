import { NestFactory, FastifyAdapter } from '@nestjs/core';
import { AppModule } from './app.module';
import {useContainer} from 'class-validator';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  useContainer(app.select(AppModule),{fallbackOnErrors: true});
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);

  if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
  }
}
bootstrap();
