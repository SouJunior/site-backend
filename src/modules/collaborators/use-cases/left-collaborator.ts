import { badRequest } from 'src/shared/helpers/http-helper';
import { CollaboratorsRepository } from '../repositories/collaborators-repository';
import { CustomError } from 'src/shared/errors/custom-error';
import { Injectable } from '@nestjs/common';
import { Collaborator } from '../entities/collaborator.entity';

interface LeftCollaboratorRequest {
  id: string;
}

type LeftCollaboratorResponse = Collaborator;

@Injectable()
export class LeftCollaborator {
  constructor(private collaboratorRepository: CollaboratorsRepository) {}

  async execute({
    id,
  }: LeftCollaboratorRequest): Promise<LeftCollaboratorResponse> {
    const collaborator = await this.collaboratorRepository.findById(id);

    if (collaborator.leftAt) {
      throw badRequest(new CustomError('Collaborator already left'));
    }

    collaborator.left();
    return await this.collaboratorRepository.save(collaborator);
  }
}
