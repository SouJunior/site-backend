import { Collaborator } from 'src/modules/collaborators/entities/collaborator.entity';

export class CollaboratorViewModel {
  static toHTTP(collaborator: Collaborator) {
    return {
      id: collaborator.id,
      name: collaborator.name,
      role: collaborator.role,
      joinAt: collaborator.joinAt,
      leftAt: collaborator.leftAt,
    };
  }
}
