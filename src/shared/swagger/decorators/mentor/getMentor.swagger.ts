import {
  applyDecorators,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { MentorResponseDTO } from 'src/modules/mentor/dto/mentor-response.dto';

export function GetMentorSwagger() {
  return applyDecorators(
    ApiOperation({
      summary:
        'Resgata um mentor do banco por email ou todos, se nenhum email for fornecido',
    }),
    ApiResponse({
      status: 200,
      description: 'Sucesso',
      type: MentorResponseDTO,
      isArray: true,
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
    ApiQuery({
      name: 'email',
      description: 'Email do mentor (opcional)',
      required: false,
      type: String,
    }),
  );
}
