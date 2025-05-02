import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ErrorMessageSwagger } from "../../error-message.swagger";
import { UserLoggedDto } from "src/modules/auth/dtos/user-logged.dto";


export function UserLoggedSwagger(){
    return applyDecorators(
        ApiResponse({
            status: HttpStatus.OK,
            description: 'Sucesso na rota',
            type: UserLoggedDto
        }),
        ApiResponse({
            status: HttpStatus.UNAUTHORIZED,
            description: "Usuário não autorizado",
            type: ErrorMessageSwagger
        }),
        ApiOperation({
            summary: 'Retorna usuário logado'
        })
    )
}