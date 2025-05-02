import { ApiProperty } from "@nestjs/swagger";


export class UserLoginResponseDto{
    @ApiProperty({
        example:
            'auNfzLZvfNxamyftJZpkXsalCneJ82j4juNfzLZvfNxamyftJZpkXsalCneJ82j4juNfzLZvfNxamyftJZpkXsalCneJ82j4juNfzLZvfNxamyftJZpkXsalCneJ82j4j.exemplo',
        description: "Token de autenticação JWT"
    })
    token: string;
}