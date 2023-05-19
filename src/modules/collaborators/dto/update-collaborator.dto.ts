import { PartialType } from '@nestjs/swagger';
import { CreateCollaboratorDto } from './create-collaborator.dto';

export class UpdateCollaboratorDto extends PartialType(CreateCollaboratorDto) {}
