import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";
import { REGEX } from "src/modules/app/app.utils";
import { Orders } from "src/modules/orders/entities/order.entity";


export class CreateCustomerDto {
    CustomerID: number
    @IsNotEmpty({message: 'The Customer should have a first name!'})
    @Length(0,255)
    FirstName: string;
    @IsNotEmpty({message: 'The Customer should have a last name!'})
    @Length(0,255)
    LastName: string;
    @IsEmail()
    @Length(5,255)
    Email: string;
    @IsString()
    @Matches(REGEX.NUMBER_PHONE_RULE, { message: 'Phone number must be exactly 10 digits' })
    PhoneNumber: string;

    orders: Orders[];
}