import { IsString, IsNotEmpty, IsNumber, IsPositive, IsDateString, IsOptional } from 'class-validator';

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    customerName: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsNumber()
    @IsPositive()
    quantityTrays: number;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsDateString() // Valida que sea una fecha válida (ISO 8601)
    deleveryDate: string;
}