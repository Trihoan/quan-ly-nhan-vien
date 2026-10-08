import {
    ArrayMaxSize,
    IsArray,
    IsDateString,
    IsEmail,
    IsInt,
    IsOptional,
    IsString,
    Min,
    MinLength
} from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    @MinLength(1)
    lastname!: string;

    @IsString()
    @MinLength(1)
    firstname!: string;

    @IsOptional()
    @IsDateString()
    birthday?: string | null;

    @IsOptional()
    @IsString()
    gender?: string | null;

    @IsOptional()
    @IsDateString()
    startDate?: string | null;

    @IsString()
    @MinLength(1)
    code!: string;

    @IsOptional()
    @IsString()
    manager?: string | null;

    @IsString()
    @MinLength(10)
    phone!: string;

    @IsOptional()
    @IsString()
    address?: string | null;

    @IsOptional()
    @IsArray()
    @ArrayMaxSize(1)
    @IsInt({ each: true })
    @Min(1, { each: true })
    departmentIds?: number[];

    @IsEmail()
    ssoEmail!: string;

    @IsOptional()
    @IsString()
    role?: string | null;

    @IsOptional()
    @IsString()
    status?: string;
}
