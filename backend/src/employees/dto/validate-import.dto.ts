import { Type } from "class-transformer";
import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsBoolean,
    IsInt,
    IsOptional,
    IsString,
    Min,
    ValidateNested
} from "class-validator";

export class ImportEmployeeRowDto {
    @IsInt()
    @Min(2)
    rowNumber!: number;

    @IsOptional()
    @IsBoolean()
    allowDepartmentInsert?: boolean;

    @IsString()
    lastname!: string;

    @IsString()
    firstname!: string;

    @IsString()
    birthday!: string;

    @IsString()
    gender!: string;

    @IsString()
    startDate!: string;

    @IsString()
    code!: string;

    @IsString()
    manager!: string;

    @IsString()
    phone!: string;

    @IsString()
    address!: string;

    @IsString()
    department!: string;

    @IsString()
    ssoEmail!: string;
}

export class ValidateImportDto {
    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(50)
    @ValidateNested({ each: true })
    @Type(() => ImportEmployeeRowDto)
    rows!: ImportEmployeeRowDto[];
}
