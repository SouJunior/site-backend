import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSupporterDTO{

    @ApiProperty({description: 'Pessoa Física ou Jurídica', example:'Sou Pessoa Jurídica'})
    @IsString()
    @IsNotEmpty()
    personType: string;

    @ApiProperty({description: 'Nome do apoiador', example:'Teodoro Monteiro'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({description: 'Nome de Preferência do Apoiador', example:'Falcão'})
    @IsString()
    @IsNotEmpty()
    surname: string;

    @ApiProperty({description: 'Telefone do apoiador', example:'(31) 925522579'})
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({description: 'Email do apoiador', example:'tmonteiro@yggdrasil.co'})
    @IsString()
    @IsNotEmpty()
    @IsEmail({}, {message: 'Formato de email inválido'})
    email: string;

    @ApiProperty({description: 'Como o Apoiador gostaria de contribuir', example:'Tenho somas vultosas de dinheiro, gostaria de usar a SouJunior como um think tank'})
    @IsString()
    @IsNotEmpty()
    message: string;

}