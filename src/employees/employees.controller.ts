import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto, @Req() req: any) {
    return this.employeesService.create(createEmployeeDto, req);
  }

  @Get()
  findAll(@Query() query: string):Promise<[Employee[], number]> {
    for(const queryKey of Object.keys(query)){
      if(queryKey == "find-optionns"){
        return this.employeesService.findAllWithOptions(decodeURI(query[queryKey]))
      }
    }
    return this.employeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }

  @Patch(':employeeId/departments/:departmentId')
  setDepartmentById(employeeId: string, departmentId: string): Promise<void>{
    return this.employeesService.setDepartmentById(+employeeId, +departmentId, )
  }

  @Delete(':employeeid/departments/:departmentId')
  unsetDepartmentById(employeeId: string): Promise<void>{
    return this.employeesService.unsetDepartmentById(+employeeId)
  }
}
