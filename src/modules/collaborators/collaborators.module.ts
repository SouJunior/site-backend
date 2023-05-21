import { Module } from '@nestjs/common';
import { CollaboratorsController } from './controllers/collaborators.controller';
import { GetCollaborator } from './use-cases/get-one-collaborator';
import { RegisterCollaborator } from './use-cases/register-collaborator';
import { GetCollaborators } from './use-cases/get-collaborators';
import { EditCollaborator } from './use-cases/edit-collaborator';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CollaboratorsController],
  providers: [
    EditCollaborator,
    GetCollaborators,
    GetCollaborator,
    RegisterCollaborator,
  ],
})
export class CollaboratorsModule {}
