import { notFound } from 'src/shared/helpers/http-helper';
import { Collaborator } from '../entities/collaborator.entity';
import { CollaboratorsRepository } from '../repositories/collaborators-repository';
import { Injectable } from '@nestjs/common';
import { CustomError } from 'src/shared/errors/custom-error';

interface GetCollaboratorRequest {
  id: string;
}

interface GetCollaboratorResponse {
  collaborator: Collaborator;
}

@Injectable()
export class GetCollaborator {
  constructor(private collaboratorRepository: CollaboratorsRepository) {}
  async execute(
    data: GetCollaboratorRequest,
  ): Promise<GetCollaboratorResponse> {
    const collaborator = await this.collaboratorRepository.findById(data.id);
    if (!collaborator)
      throw notFound(new CustomError('Collaborator not found'));

    console.log(collaborator);
    return {
      collaborator,
    };
  }
}
