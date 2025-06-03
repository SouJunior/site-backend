import {
  applyDecorators,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { PaginatedSupporterResponseDTO } from 'src/modules/supporter/dto/paginated-supporter.dto';
import { Order } from 'src/shared/enum/pagination-order';

export function GetSupporterSwagger() {
  return applyDecorators(
    ApiOperation({
      summary:
        'Resgata um apoiador do banco por email ou todos, se nenhum email for fornecido',
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
      description: 'Email do apoiador (opcional)',
      required: false,
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'Sucesso',
      type: PaginatedSupporterResponseDTO,
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
