import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PG_UNIQUE_CONSTRAINT_VIOLATION } from 'src/global/error.codes';
import { logger } from 'src/main';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee) private employeeRepository: Repository<Employee>


  ) { }
  async create(createEmployeeDto: CreateEmployeeDto, req: any): Promise<Employee> {
    try {
      const newEmployee = this.employeeRepository.create(createEmployeeDto);


     return await this.employeeRepository.save(newEmployee)
    } catch (error) {
      logger.error(error.message, {time: new Date(), request_method: req.method, endpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']}),
      logger.debug(error.stack, { time: new Date(), request_method: req.method, endpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']})
      if (error && error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: `There was a problem with employee creation: ${error.message}`
        }, HttpStatus.BAD_REQUEST)
      } else

        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `There was a problem with employee creation: ${error.message}`
        }, HttpStatus.INTERNAL_SERVER_ERROR)

    }
  }

  async findAll():Promise<[Employee[], number]> {
    try {
      return await this.employeeRepository.findAndCount();

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem assessing employee data: ${error.message}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  async findAllWithOptions(findOptions: string): Promise<[Employee[], number]> {
    try{
      return await this.employeeRepository.findAndCount(JSON.parse(findOptions))

    }catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem assessing user data: ${error.message}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  async findOne(id: number):Promise<Employee> {
    try {
      return await this.employeeRepository.findOne(id);

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem assessing employee data: ${error.message}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto):Promise<UpdateResult> {
    try {
        
      return await this.employeeRepository.update(id, { ...updateEmployeeDto })

    } catch (error) {
      if (error && error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: `There was a problem with employee update: ${error.message}`
        }, HttpStatus.BAD_REQUEST)
      } else

        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `There was a problem with employee update: ${error.message}`
        }, HttpStatus.INTERNAL_SERVER_ERROR)

    }
    
  }

  async remove(id: number):Promise<DeleteResult> {
    try{
      return await this.employeeRepository.delete(id);
 
     }catch(error){
       throw new HttpException({
         status: HttpStatus.INTERNAL_SERVER_ERROR,
         error: `There was a problem deleting user data: ${error.message}`
       }, HttpStatus.INTERNAL_SERVER_ERROR)
     }
  }
  
  async setDepartmentById(employeeId: number, departmentId: number): Promise<void>{
    try{
      return await this.employeeRepository.createQueryBuilder()
      .relation(Employee, "department")
      .of(employeeId)
      .set(departmentId)

    }catch(error){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem assessing user data: ${error.message}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
      
    }
  }

  async unsetDepartmentById(employeeId: number): Promise<void>{
    try{
      return await this.employeeRepository.createQueryBuilder()
      .relation(Employee, "department")
      .of(employeeId)
      .set(null)

    }catch(error){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem assessing user data: ${error.message}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
      
    }
  }
}
