import { PipeTransform, Injectable, ArgumentMetadata, NotFoundException } from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class ValidateIdPipe implements PipeTransform<any> {
  
  async transform(value, { metatype }: ArgumentMetadata) {
    // if (!metatype || !this.toValidate(metatype)) {
    //   return value;
    // }
    
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new NotFoundException(`Item with id ${value} could not be found`);
    }

    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}