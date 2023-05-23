import { Collaborator } from '../entities/collaborator.entity';

export interface updateByIdFields {
  name?: string;
  role?: string;
}

export abstract class CollaboratorsRepository {
  abstract create(collaborator: Collaborator): Promise<void>;
  abstract findById(id: string): Promise<Collaborator | null>;
  abstract findByName(name: string): Promise<Collaborator | null>;
  abstract findMany(): Promise<Collaborator[]>;
  abstract updateById(
    id: string,
    fields: updateByIdFields,
  ): Promise<Collaborator>;
  abstract save(collaborator: Collaborator): Promise<Collaborator>;
}
