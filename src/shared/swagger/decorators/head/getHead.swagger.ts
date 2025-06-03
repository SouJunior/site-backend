import {
  applyDecorators,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { PaginatedHeadResponseDTO } from 'src/modules/head/dto/paginetad-head.dto';
import { Order } from 'src/shared/enum/pagination-order';

export function GetHeadSwagger() {
  return applyDecorators(
    ApiOperation({
      summary:
        'Resgata um head do banco por email ou todos, se nenhum email for fornecido',
    }),
    ApiQuery({
      name: 'page',
      description: 'Número da página, padrão 1, mínimo 1',
      required: false,
      type: Number,
      example: 1,
    }),
    ApiQuery({
      name: 'take',
      description:
        'Quantidade de resultados por página, padrão 10, mínimo 1, máximo 50',
      required: false,
      type: Number,
      example: 10,
    }),
    ApiQuery({
      name: 'order',
      description: 'Ordenação dos resultados',
      required: false,
      type: String,
      enum: Order,
      example: Order.ASC,
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
      type: PaginatedHeadResponseDTO,
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
