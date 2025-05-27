import { applyDecorators, BadRequestException } from "@nestjs/common";
import { ApiHeader, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateJuniorDto } from "src/modules/juniors/dtos/create-junior-dto";



export function CreateJuniorSwagger(){
    return applyDecorators(
        ApiOperation({
            summary: 'Registra o Junior no Banco de Dados',
        }),
        ApiResponse({
            status: 200,
            description: 'Sucesso',
            type: CreateJuniorDto,
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