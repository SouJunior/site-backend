import {
  applyDecorators,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { HeadResponseDTO } from 'src/modules/head/dto/head-response.dto';

export function GetHeadSwagger() {
  return applyDecorators(
    ApiOperation({
      summary:
        'Resgata um head do banco por email ou todos, se nenhum email for fornecido',
    }),
    ApiQuery({
      name: 'email',
      description: 'Email do head (opcional)',
      required: false,
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'Sucesso',
      type: HeadResponseDTO,
      isArray: true,
    }),
    ApiResponse({
      status: 400,
      description: 'Erro ao requisitar o head',
      type: BadRequestException,
    }),
    ApiResponse({
      status: 404,
      description: 'Head não encontrado',
      type: NotFoundException,
    }),
  );
}
