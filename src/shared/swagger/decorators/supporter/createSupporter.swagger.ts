import { applyDecorators, BadRequestException } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SupporterResponseDTO } from 'src/modules/supporter/dto/supporter-response.dto';

export function CreateSupporterSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Registra o Apoiador no Banco de Dados',
    }),
    ApiResponse({
      status: 200,
      description: 'Sucesso',
      type: SupporterResponseDTO,
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
