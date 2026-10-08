import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    ParseUUIDPipe,
    Post,
    Put
} from "@nestjs/common";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { ValidateImportDto } from "./dto/validate-import.dto";
import { SaveImportRawDto } from "./dto/save-import-raw.dto";
import { EmployeesService } from "./employees.service";

@Controller("employees")
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) {}

    @Post()
    create(@Body() input: CreateEmployeeDto) {
        return this.employeesService.create(input);
    }

    @Put(":id")
    update(
        @Param("id", ParseIntPipe) id: number,
        @Body() input: UpdateEmployeeDto
    ) {
        return this.employeesService.update(id, input);
    }

    @Post("import/validate")
    validateImport(@Body() input: ValidateImportDto) {
        return this.employeesService.validateImport(input.rows);
    }

    @Post("import")
    importRows(@Body() input: SaveImportRawDto) {
        return this.employeesService.saveImportRowsToRaw(input.batchId, input.rows);
    }

    @Get("import/:batchId")
    importBatchStatus(@Param("batchId", ParseUUIDPipe) batchId: string) {
        return this.employeesService.getRawImportBatchStatus(batchId);
    }

}
