import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { EmployeesModule } from "./employees/employees.module";

@Module({
    imports: [DatabaseModule, EmployeesModule]
})
export class AppModule {}
