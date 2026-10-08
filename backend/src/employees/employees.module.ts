import { Module } from "@nestjs/common";
import { EmployeesController } from "./employees.controller";
import { EmployeesService } from "./employees.service";
import { ImportQueueConsumer } from "./import-queue.consumer";

@Module({
    controllers: [EmployeesController],
    providers: [EmployeesService, ImportQueueConsumer]
})
export class EmployeesModule {}
