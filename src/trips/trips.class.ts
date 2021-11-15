import { IsNumber, IsString, IsDate, IsNotEmpty} from 'class-validator';
import {Type} from 'class-transformer'

export class Trip {
    id?: number;

    @IsString()
    @IsNotEmpty()
    startAdress?: string;

    @IsString()
    @IsNotEmpty() 
    destinationAdress?: string;

    distance?: number;

    @IsNotEmpty()
    @IsNumber()
    price?: number;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    date?: Date;
}