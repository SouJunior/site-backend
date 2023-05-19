import { Injectable } from '@nestjs/common';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';

@Injectable()
export class CollaboratorsService {
  create(createCollaboratorDto: CreateCollaboratorDto) {
    return 'This action adds a new collaborator';
  }

  findAll() {
    return `This action returns all collaborators`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collaborator`;
  }

  update(id: number, updateCollaboratorDto: UpdateCollaboratorDto) {
    return `This action updates a #${id} collaborator`;
  }

  remove(id: number) {
    return `This action removes a #${id} collaborator`;
  }
}
