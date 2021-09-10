import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PG_UNIQUE_CONSTRAINT_VIOLATION } from 'src/global/error.codes';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department) private departmentRepository: Repository<Department>


  ) { }
  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    try {
      const newDepartment = this.departmentRepository.create(createDepartmentDto);

      const department = await this.departmentRepository.save(newDepartment)

      return department;

    } catch (error) {
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


  async findAll(): Promise<Department[]> {
    try {
      return await this.departmentRepository.find();

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem assessing department data: ${error.message}`
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
  
  async addUserById(departmentId: number, userId: number): Promise<void>{
    try{
      return await this.departmentRepository.createQueryBuilder()
      .relation(Department, "users")
      .of(departmentId)
      .add(userId)
    }catch(error){

    }
  }

  async addUsersById(departmentId: number, userIds: number): Promise<void>{
    try{
      return await this.departmentRepository.createQueryBuilder()
      .relation(Department, "users")
      .of(departmentId)
      .add(userIds)
    }catch(error){

    }
  }

  async removeUserById(departmentId: number, userId: number): Promise<void>{
    try{
      return await this.departmentRepository.createQueryBuilder()
      .relation(Department, "users")
      .of(departmentId)
      .remove(userId)
    }catch(error){

    }
  }

  async removeUsersById(departmentId: number, userIds: number): Promise<void>{
    try{
      return await this.departmentRepository.createQueryBuilder()
      .relation(Department, "users")
      .of(departmentId)
      .remove(userIds)
    }catch(error){

    }
  }

}
