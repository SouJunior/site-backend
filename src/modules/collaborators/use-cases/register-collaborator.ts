import { badRequest } from 'src/shared/helpers/http-helper';
import { Collaborator } from '../entities/collaborator.entity';
import { CollaboratorsRepository } from '../repositories/collaborators-repository';
import { Injectable } from '@nestjs/common';
import { CustomError } from 'src/shared/errors/custom-error';

interface RegisterCollaboratorRequest {
  name: string;
  role: string;
}

interface RegisterCollaboratorResponse {
  collaborator: Collaborator;
}

@Injectable()
export class RegisterCollaborator {
  constructor(private collaboratorRepository: CollaboratorsRepository) {}

  async execute({
    name,
    role,
  }: RegisterCollaboratorRequest): Promise<RegisterCollaboratorResponse> {
    let collaborator = await this.collaboratorRepository.findByName(name);

    if (collaborator)
      throw badRequest(new CustomError('Collaborator already registered'));

    collaborator = new Collaborator({
      role,
      name,
    });

    await this.collaboratorRepository.create(collaborator);

    return {
      collaborator,
    };
  }
}
