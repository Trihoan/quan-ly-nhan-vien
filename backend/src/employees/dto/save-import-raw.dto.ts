import { IsUUID } from "class-validator";
import { ValidateImportDto } from "./validate-import.dto";

export class SaveImportRawDto extends ValidateImportDto {
    @IsUUID()
    batchId!: string;
}
