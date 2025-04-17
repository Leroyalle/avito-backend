import { Injectable } from '@nestjs/common';
import { CreateFieldInput } from './dto/create-field.input';
import { UpdateFieldInput } from './dto/update-field.input';

@Injectable()
export class FieldService {
  create(createFieldInput: CreateFieldInput) {
    return 'This action adds a new field';
  }

  findAll() {
    return `This action returns all field`;
  }

  findOne(id: number) {
    return `This action returns a #${id} field`;
  }

  update(id: number, updateFieldInput: UpdateFieldInput) {
    return `This action updates a #${id} field`;
  }

  remove(id: number) {
    return `This action removes a #${id} field`;
  }
}
