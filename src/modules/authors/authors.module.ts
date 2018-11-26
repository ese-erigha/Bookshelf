import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorsRepository } from './authors.repository';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { AuthorSchema } from './schemas/author.schema';
import { IsAuthorAlreadyExist } from './validators/IsAuthorAlreadyExist';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }])],
  controllers: [AuthorsController],
  providers: [AuthorsService, AuthorsRepository,IsAuthorAlreadyExist],
  exports: [AuthorsService]
})
export class AuthorsModule {}