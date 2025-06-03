import {
  applyDecorators,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { PaginatedJuniorResponseDTO } from 'src/modules/juniors/dtos/paginated-junior.dto';
import { Order } from 'src/shared/enum/pagination-order';

export function GetJuniorsSwagger() {
  return applyDecorators(
    ApiOperation({
      summary:
        'Resgata um junior do banco por email ou todos, se nenhum email for fornecido',
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
      description: 'Email do júnior (opcional)',
      required: false,
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'Sucesso',
      type: PaginatedJuniorResponseDTO,
    }),
    ApiResponse({
      status: 400,
      description: 'Erro ao requisitar o júnior',
      type: BadRequestException,
    }),
    ApiResponse({
      status: 404,
      description: 'Júnior não encontrado',
      type: NotFoundException,
    }),
  );
}
