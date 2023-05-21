import { Injectable } from '@nestjs/common';
import { Collaborator } from '../entities/collaborator.entity';
import { CollaboratorsRepository } from '../repositories/collaborators-repository';

interface GetCollaboratorsResponse {
  collaborators: Collaborator[];
}

@Injectable()
export class GetCollaborators {
  constructor(private collaboratorRepository: CollaboratorsRepository) {}

  async execute(): Promise<GetCollaboratorsResponse> {
    const collaborators = await this.collaboratorRepository.findMany();
    return {
      collaborators,
    };
  }
}
