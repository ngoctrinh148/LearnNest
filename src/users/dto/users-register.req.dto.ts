import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator"
import { MESSAGE, REGEX } from "src/app.utils"

export class UserRegisterRequestDto {
    @ApiProperty({
        description: 'The name of the User',
        example: 'Example'
    })
    @IsNotEmpty()
    UserName: string

    @ApiProperty({
        description: 'The email address of the User',
        example: 'abc@example.com'
    })

    @IsNotEmpty()
    @IsEmail()
    Email: string

    @ApiProperty({
        description: 'The password of the User',
        example: 'Password@123'
    })
    @IsNotEmpty()
    @Length(8, 24)
    @Matches(REGEX.PASSWORD_RULE,
        { message: MESSAGE.PASSWORD_RULE_MESSAGE })
    Password: string

    @ApiProperty({
        description: 'The confirm of your password',
        example: 'Password@123'
    })
    @IsNotEmpty()
    @Length(8, 24)
    @Matches(REGEX.PASSWORD_RULE,
        { message: MESSAGE.PASSWORD_RULE_MESSAGE })
    Confirm: string
}
