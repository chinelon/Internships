import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PG_UNIQUE_CONSTRAINT_VIOLATION } from 'src/global/error.codes';
import { logger } from 'src/main';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department) private departmentRepository: Repository<Department>


  ) { }
  async create(createDepartmentDto: CreateDepartmentDto, req: any): Promise<Department> {
    try {
      const newDepartment = this.departmentRepository.create(createDepartmentDto);

      return await this.departmentRepository.save(newDepartment)

    } catch (error) {
      logger.error(error.message, {time: new Date(), request_method: req.method, endpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']}),
      logger.debug(error.stack, { time: new Date(), request_method: req.method, endpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']})
      if (error && error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: `There was a problem with user creation: ${error.message}`
        }, HttpStatus.BAD_REQUEST)
      } else

        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `There was a problem with user creation: ${error.message}`
        }, HttpStatus.INTERNAL_SERVER_ERROR)

    }
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto): Promise<UpdateResult> {
    try {
      
      return await this.departmentRepository.update(id, { ...updateDepartmentDto })

    } catch (error) {
      if (error && error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: `There was a problem with updating departments: ${error.message}`
        }, HttpStatus.BAD_REQUEST)
      } else

        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `There was a problem with updating departments: ${error.message}`
        }, HttpStatus.INTERNAL_SERVER_ERROR)

    }
  }


  async findAll(): Promise<[Department[], number]> {
    try {
      return await this.departmentRepository.findAndCount();

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem assessing department data: ${error.message}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAllWithOptions(findOptions: string): Promise<[Department[], number]> {
    try{
      return await this.departmentRepository.findAndCount(JSON.parse(findOptions))

    }catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem assessing user data: ${error.message}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  async findOne(id: number): Promise<Department>{
    try {
      return await this.departmentRepository.findOne(id);

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem assessing user data: ${error.message}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  
  async remove(id: number):Promise<DeleteResult> {
    try{
      return await this.departmentRepository.delete(id);
 
     }catch(error){
       throw new HttpException({
         status: HttpStatus.INTERNAL_SERVER_ERROR,
         error: `There was a problem deleting user data: ${error.message}`
       }, HttpStatus.INTERNAL_SERVER_ERROR)
     }
  }

  async addEmployeeById(departmentId: number, employeeId: number): Promise<void>{
    try{
      return await this.departmentRepository.createQueryBuilder()
      .relation(Department, "employee")
      .of(departmentId)
      .add(employeeId)
    }catch(error){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem adding employee data: ${error.message}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async removeEmployeeById(departmentId: number, employeeId: number): Promise<void>{
    try{
      return await this.departmentRepository.createQueryBuilder()
      .relation(Department, "employees")
      .of(departmentId)
      .remove(employeeId)
    }catch(error){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem removing employee data: ${error.message}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  
  async addEmployeesById(departmentId: number, employeeIds: number[]): Promise<void>{
    try{
      return await this.departmentRepository.createQueryBuilder()
      .relation(Department, "employees")
      .of(departmentId)
      .add(employeeIds)
    }catch(error){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem adding employee data: ${error.message}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async removeEmployeesById(departmentId: number, employeeIds: number[]): Promise<void>{
    try{
      return await this.departmentRepository.createQueryBuilder()
      .relation(Department, "employees")
      .of(departmentId)
      .remove(employeeIds)
    }catch(error){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem removing employee data: ${error.message}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  
}