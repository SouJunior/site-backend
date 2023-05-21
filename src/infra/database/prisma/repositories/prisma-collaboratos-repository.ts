import { Injectable } from '@nestjs/common';
import { Collaborator } from 'src/modules/collaborators/entities/collaborator.entity';
import {
  CollaboratorsRepository,
  updateByIdFields,
} from 'src/modules/collaborators/repositories/collaborators-repository';
import { PrismaService } from '../prisma.service';
import { PrismaCollaboratorsMapper } from '../mappers/prisma-collaboratos-mapper';

@Injectable()
export class PrismaCollaboratorsRepository implements CollaboratorsRepository {
  constructor(private prisma: PrismaService) {}

  async create(collaborator: Collaborator): Promise<void> {
    await this.prisma.collaborator.create({
      data: PrismaCollaboratorsMapper.toPrisma(collaborator),
    });
  }

  async findById(id: string): Promise<Collaborator> {
    const collaborator = await this.prisma.collaborator.findUnique({
      where: {
        id,
      },
    });

    if (!collaborator) return null;

    return PrismaCollaboratorsMapper.toDomain(collaborator);
  }

  async findMany(): Promise<Collaborator[]> {
    const collaborators = await this.prisma.collaborator.findMany();
    if (!collaborators.length) return [];

    return collaborators.map(PrismaCollaboratorsMapper.toDomain);
  }

  async updateById(
    id: string,
    fields: updateByIdFields,
  ): Promise<Collaborator> {
    const collaborator = await this.prisma.collaborator.update({
      where: {
        id,
      },
      data: fields,
    });

    return PrismaCollaboratorsMapper.toDomain(collaborator);
  }

  async findByName(name: string): Promise<Collaborator> {
    const collaborator = await this.prisma.collaborator.findUnique({
      where: {
        name,
      },
    });

    if (!collaborator) return null;

    return PrismaCollaboratorsMapper.toDomain(collaborator);
  }
}
