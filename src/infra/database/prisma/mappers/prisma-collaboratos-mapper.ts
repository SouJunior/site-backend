import { Collaborator } from 'src/modules/collaborators/entities/collaborator.entity';
import { Collaborator as RawCollaborator } from '@prisma/client';

export class PrismaCollaboratorsMapper {
  static toPrisma(collaborator: Collaborator): RawCollaborator {
    return {
      id: collaborator.id,
      name: collaborator.name,
      joinAt: collaborator.joinAt,
      leftAt: collaborator.leftAt,
      role: collaborator.role,
    };
  }

  static toDomain(raw: RawCollaborator): Collaborator {
    return new Collaborator({
      id: raw.id,
      name: raw.name,
      role: raw.role,
      joinAt: raw.joinAt,
      leftAt: raw.leftAt,
    });
  }
}
