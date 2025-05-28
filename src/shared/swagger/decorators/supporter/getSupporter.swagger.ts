import {
  applyDecorators,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { SupporterResponseDTO } from 'src/modules/supporter/dto/supporter-response.dto';

export function GetSupporterSwagger() {
  return applyDecorators(
    ApiOperation({
      summary:
        'Resgata um apoiador do banco por email ou todos, se nenhum email for fornecido',
    }),
    ApiQuery({
      name: 'email',
      description: 'Email do apoiador (opcional)',
      required: false,
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'Sucesso',
      type: SupporterResponseDTO,
      isArray: true,
    }),
    ApiResponse({
      status: 400,
      description: 'Erro ao requisitar o apoiador',
      type: BadRequestException,
    }),
    ApiResponse({
      status: 404,
      description: 'Apoiador não encontrado',
      type: NotFoundException,
    }),
  );
}
