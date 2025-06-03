import {
  applyDecorators,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { PaginatedMentorResponseDTO } from 'src/modules/mentor/dto/paginated-mentor-response.dto';
import { Order } from 'src/shared/enum/pagination-order';

export function GetMentorSwagger() {
  return applyDecorators(
    ApiOperation({
      summary:
        'Resgata um mentor do banco por email ou todos, se nenhum email for fornecido',
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
      description: 'Email do mentor (opcional)',
      required: false,
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'Sucesso',
      type: PaginatedMentorResponseDTO,
    }),
    ApiResponse({
      status: 400,
      description: 'Erro ao requisitar o mentor',
      type: BadRequestException,
    }),
    ApiResponse({
      status: 404,
      description: 'Mentor não encontrado',
      type: NotFoundException,
    }),
  );
}
