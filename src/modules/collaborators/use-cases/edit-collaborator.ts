import { notFound } from 'src/shared/helpers/http-helper';
import { Collaborator } from '../entities/collaborator.entity';
import { CollaboratorsRepository } from '../repositories/collaborators-repository';
import { Injectable } from '@nestjs/common';
import { CustomError } from 'src/shared/errors/custom-error';

interface EditCollaboratorProps {
  id: string;
  name?: string;
  role?: string;
}

interface EditCollaboratorResponse {
  collaborator: Collaborator;
}

@Injectable()
export class EditCollaborator {
  constructor(
    private readonly collaboratorRepository: CollaboratorsRepository,
  ) {}

  async execute({
    id,
    name,
    role,
  }: EditCollaboratorProps): Promise<EditCollaboratorResponse> {
    const collaborator = await this.collaboratorRepository.findById(id);
    if (!collaborator)
      throw notFound(new CustomError('Collaborator not found'));

    const updatedCollaborator = await this.collaboratorRepository.updateById(
      id,
      {
        name,
        role,
      },
    );

    return {
      collaborator: updatedCollaborator,
    };
  }
}
