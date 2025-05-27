import { Type, Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class FilterJuniorsDTO{
    @IsOptional()
    name ?: string;

    @IsOptional()
    email ?: string;
    
    @IsOptional()
    linkedin ?: string;
    
    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value, 10))
    area ?: number;
    
    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value, 10))
    subarea ?: number;
    
    @IsOptional()
    @Transform(({value}) => value === 'true' || value === '1')
    indication ?: boolean;
    
    @IsOptional()
    linkedinIndication ?: string;
    
    @IsOptional()
    availability ?: string;
    
    @IsOptional()
    @Transform(({value}) => value === 'true' || value === '1')    
    turn ?: boolean;
    
    @IsOptional()
    startOption ?: string;

    @IsOptional()
    toolsKnowledge ?: string;

    @IsOptional()
    fieldKnowledge ?: string;

    @IsOptional()
    volunteerMotivation ?: string;

    @IsOptional()
    @Transform(({value}) => value === 'true' || value === '1') 
    contactAgreement ?: boolean;

    @IsOptional()
    @Transform(({value}) => value === 'true' || value === '1') 
    termsAgreement ?: boolean;

    @IsOptional()
    @Transform(({value}) => {  
        if (!value) 
            return undefined;  
        const date = new Date(value);  
        if (isNaN(date.getTime())) {  
            throw new Error(`Invalid date format: ${value}`);  
        }  
        return date;  
    }) 
    @Type(() => Date)
    startDate ?: Date;
}