import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator"
import { MESSAGE, REGEX } from "src/app.utils"

export class UserRegisterRequestDto {
    @IsNotEmpty()
    UserName: string


    @IsNotEmpty()
    @IsEmail()
    Email: string

    @IsNotEmpty()
    @Length(8, 24)
    @Matches(REGEX.PASSWORD_RULE,
        { message: MESSAGE.PASSWORD_RULE_MESSAGE })
    Password: string

    @IsNotEmpty()
    @Length(8, 24)
    @Matches(REGEX.PASSWORD_RULE,
        { message: MESSAGE.PASSWORD_RULE_MESSAGE })
    Confirm: string
}
