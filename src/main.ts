import { NestFactory, FastifyAdapter } from '@nestjs/core';
import { AppModule } from './app.module';
import {useContainer} from 'class-validator';
import * as compression from 'compression';
declare const module: any;

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule),{fallbackOnErrors: true});
  app.use(compression());
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT || 3000);

  if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
  }
}
bootstrap();
