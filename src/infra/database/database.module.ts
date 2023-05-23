import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CollaboratorsRepository } from '../../modules/collaborators/repositories/collaborators-repository';
import { PrismaCollaboratorsRepository } from './prisma/repositories/prisma-collaboratos-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CollaboratorsRepository,
      useClass: PrismaCollaboratorsRepository,
    },
  ],
  exports: [CollaboratorsRepository],
})
export class DatabaseModule {}
