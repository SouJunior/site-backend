import { ApiProperty } from "@nestjs/swagger";


export class UserLoggedDto{
    @ApiProperty({
        example: "6812fd24a406f0c09c7bc46b"
    })
    id: string;

    @ApiProperty({
        example: "Jadson Santos"
    })
    name: string;

    @ApiProperty({
        example: "jadsoncodador@gmail.com"
    })
    email: string;

    @ApiProperty({
        example: "ADMIN"
    })
    role: string;

    @ApiProperty({
        example: "2025-05-01T19:28:39.688Z"
    })
    createdAt: Date;

    @ApiProperty({
        example: "2025-05-01T19:28:39.688Z"
    })
    updatedAt: Date;

    @ApiProperty({
        example: true
    })
    mailConfirm: boolean;
}