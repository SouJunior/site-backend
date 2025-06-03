import { applyDecorators, BadRequestException } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HeadResponseDTO } from 'src/modules/head/dto/head-response.dto';

export function CreateHeadSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Registra o Head no Banco de Dados',
    }),
    ApiResponse({
      status: 200,
      description: 'Sucesso',
      type: HeadResponseDTO,
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
