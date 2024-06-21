import { IsNotEmpty } from "class-validator";

export class CreateOrderDto {
    // OrderID: number;
    // CustomerID: number;
    @IsNotEmpty({message: 'The Order should have a OrderDate'})
    OrderDate: string;

}
