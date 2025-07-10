import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiProduces, ApiResponse } from "@nestjs/swagger";


export function ExportMentorCsvSwagger(){
    return applyDecorators(
        ApiOperation({
            summary: "Retorna o csv com os dados dos mentores"
        }),
        ApiProduces('text/csv'),
        ApiResponse({
            status: 200,
            description: 'Csv Gerado com sucesso'
        })
    )
}