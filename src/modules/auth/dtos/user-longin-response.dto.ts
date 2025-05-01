import { ApiProperty } from "@nestjs/swagger";


export class UserLoginResponseDto{
    @ApiProperty({
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBlZHJpbmhvc2VuYWRvcjI3QGdtYWlsLmNvbSIsImlhdCI6MTc0NjEyMTk0NiwiZXhwIjoxNzQ2MjA4MzQ2fQ.UkQz3vtkAf-QVzWXpSi-cjJjc4QgwhbTljQjvcaSNSw',
        description: "Token de autenticação JWT"
    })
    token: string;
}