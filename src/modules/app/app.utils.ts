import { HttpStatus, ValidationPipe } from "@nestjs/common";

const PASSWORD_RULE = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#!?@#$%^&*-]).{8,}$/;
const NUMBER_PHONE_RULE = /^\d{10}$/;
const PASSWORD_RULE_MESSAGE = 'Mật khẩu chứa ít nhất 1 chữ in hoa, 1 chữ in thường, 1 số và 1 ký tự đặt biệt'
const VALIDATION_PIPE = new ValidationPipe({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY })

export const REGEX = {
    PASSWORD_RULE,
    NUMBER_PHONE_RULE,
 
}

export const MESSAGE = {
    PASSWORD_RULE_MESSAGE,
}

export const SETTINGS = {
    VALIDATION_PIPE,
}