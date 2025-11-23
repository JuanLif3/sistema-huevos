import { IsNumber, IsPositive, IsString, IsOptional, IsDateString} from "class-validator";

export class CreateSupplyDto {
    @IsNumber()
    @IsPositive()
    quantityBoxes: number;

    @IsNumber()
    @IsPositive()
    cost: number;

    @IsString()
    @IsOptional()
    provider?: string;

    @IsDateString()
    purchaseDate: string;
}