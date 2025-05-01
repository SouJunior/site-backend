import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UserLoginResponseDto } from "src/modules/auth/dtos/user-longin-response.dto";
import { ErrorMessageSwagger } from "../../error-message.swagger";


export function LoginSwagger(){
    return applyDecorators(
          ApiResponse({
            status: HttpStatus.OK,
            description: "Retorno bem sucedido",
            type: UserLoginResponseDto,
          }),
          ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: "Erro",
            type: ErrorMessageSwagger
          }),
          ApiOperation({
            summary: "Rota para fazer login"
          }),
    );
}