import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiProduces, ApiResponse } from "@nestjs/swagger";

export function ExportJuniorsCsvSwagger(){
    return applyDecorators(
        ApiOperation({ 
            summary: 'Exporta todos os Juniors em CSV' 
        }),
        ApiProduces('text/csv'),
        ApiResponse({ 
            status: 200, 
            description: 'CSV gerado com sucesso' 
        })
    );
}