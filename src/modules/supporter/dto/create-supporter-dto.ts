import { IsEmail, IsNotEmpty, IsString, IsBoolean, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSupporterDTO {
    @ApiProperty({ description: 'Pessoa Física ou Jurídica', example: 'Pessoa Jurídica' })
    @IsString()
    @IsNotEmpty()
    personType: string;

    @ApiProperty({ description: 'Nome completo (Pessoa Física) ou nome da instituição/empresa (Pessoa Jurídica)', example: 'Teodoro Monteiro' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Nome da instituição/afiliada (caso seja Pessoa Jurídica)', example: 'Yggdrasil Co.', required: false })
    @IsString()
    @IsOptional()
    institution?: string;

    @ApiProperty({ description: 'Telefone do apoiador', example: '(31) 925522579' })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({ description: 'Email do apoiador', example: 'tmonteiro@yggdrasil.co' })
    @IsString()
    @IsNotEmpty()
    @IsEmail({}, { message: 'Formato de email inválido' })
    email: string;

    @ApiProperty({ description: 'Este número possui WhatsApp?', example: true })
    @IsBoolean()
    hasWhatsApp: boolean;

    @ApiProperty({ description: 'Como você gostaria de apoiar o projeto SouJunior?', example: 'Financiador da iniciativa' })
    @IsString()
    @IsNotEmpty()
    supportOptions: string;

    @ApiProperty({ description: 'Links para canal/plataforma (caso seja Divulgador)', example: 'https://youtube.com/meucanal', required: false })
    @IsString()
    @IsOptional()
    describeLinks?: string;

    @ApiProperty({ description: 'Áreas de expertise (caso seja Especialista disposto a palestrar)', example: 'Desenvolvimento de Software, Gestão de Projetos', required: false })
    @IsString()
    @IsOptional()
    expertiseAreas?: string;

    @ApiProperty({ description: 'Descrição de oportunidades (caso seja Recrutador ou Empresa)', example: 'Programas de estágio para desenvolvedores júnior', required: false })
    @IsString()
    @IsOptional()
    opportunitiesDescription?: string;

    @ApiProperty({ description: 'Outras formas de apoio (caso selecione "Outras formas de apoio")', example: 'Gostaria de oferecer mentoria para jovens desenvolvedores', required: false })
    @IsString()
    @IsOptional()
    otherSupport?: string;

    @ApiProperty({ description: 'Sugestão ou ideia específica para contribuir', example: 'Criar um programa de mentoria para desenvolvedores iniciantes' })
    @IsString()
    @IsNotEmpty()
    suggestion: string;

    @ApiProperty({ description: 'Motivação principal para se juntar à SouJunior', example: 'Acredito no potencial da SouJunior em transformar vidas através da tecnologia' })
    @IsString()
    @IsNotEmpty()
    volunteerMotivation: string;

    @ApiProperty({ description: 'Declaração de concordância com o projeto sem fins lucrativos', example: true })
    @IsBoolean()
    @IsNotEmpty()
    volunteeringAgreement: boolean;

    @ApiProperty({ description: 'Autorização para contato', example: true })
    @IsBoolean()
    @IsNotEmpty()
    contactAgreement: boolean;
}