import { applyDecorators, BadRequestException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { MentorResponseDTO } from 'src/modules/mentor/dto/mentor-response.dto';

export function CreateMentorSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Registra o Mentor no Banco de Dados',
    }),
    ApiResponse({
      status: 200,
      description: 'Sucesso',
      type: MentorResponseDTO,
    }),
    ApiResponse({
      status: 400,
      description: 'Erro',
      type: BadRequestException,
    }),
    ApiHeader({
      name: 'x-api-key',
      description: 'Chave secreta para autenticação',
    }),
  );
}
