import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('departments')
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto, @Req() req: any) {
    return this.departmentsService.create(createDepartmentDto, req);
  }

  @Get()
  findAl(@Query() query: string):Promise<[Department[], number]> {
    for(const queryKey of Object.keys(query)){
      if(queryKey == "find-optionns"){
        return this.departmentsService.findAllWithOptions(decodeURI(query[queryKey]))
      }
    }
    return this.departmentsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentsService.update(+id, updateDepartmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentsService.remove(+id);
  }

  @Patch('departmentId/employee/employeeId')
  addEmployeeById(@Param('departmentId') departmentId: string, @Param('employeeid') employeeId: string): Promise<void>{
    return this.departmentsService.addEmployeeById(+departmentId, +employeeId)
  }

  @Delete('departmentId/employee/employeeId')
  removeEmployeeById(departmentId: string, employeeId: string): Promise<void>{
    return this.departmentsService.removeEmployeeById(+departmentId, +employeeId)
  }

  @Patch(':departmentid/employees')
  addEmployeesById(@Param() departmentId:string, @Query() query: string ): Promise<void>{
    return this.departmentsService.addEmployeesById(+departmentId, query['employeeid'])

  }

  @Delete(':departmentid/employees')
  removeEmployeesById(@Param() departmentId:string, @Query() query: string ): Promise<void>{
    return this.departmentsService.removeEmployeesById(+departmentId, query['employeeid'])

  }
}
