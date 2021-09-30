import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PG_UNIQUE_CONSTRAINT_VIOLATION } from 'src/global/error.codes';
import { logger } from 'src/main';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>


  ) { }
  async create(createRoleDto: CreateRoleDto, req: any): Promise<Role> {
    try {
      const newRole = this.roleRepository.create(createRoleDto);

      return await this.roleRepository.save(newRole)

    } catch (error) {
      logger.error(error.message, {time: new Date(), request_method: req.method, endpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']}),
      logger.debug(error.stack, { time: new Date(), request_method: req.method, endpoint: req.url, client: req.socket.remoteAddress, agent: req.headers['user-agent']})
      if (error && error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: `There was a problem with role creation: ${error.message}`
        }, HttpStatus.BAD_REQUEST)
      } else

        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `There was a problem with role creation: ${error.message}`
        }, HttpStatus.INTERNAL_SERVER_ERROR)

    }
    
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<UpdateResult> {
    try {
      
      return await this.roleRepository.update(id, { ...updateRoleDto })

    } catch (error) {
      if (error && error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: `There was a problem with updating role: ${error.message}`
        }, HttpStatus.BAD_REQUEST)
      } else

        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `There was a problem with updating role: ${error.message}`
        }, HttpStatus.INTERNAL_SERVER_ERROR)

    }
  }

  async findAll(): Promise<[Role[], number]>{
    try {
      return await this.roleRepository.findAndCount();

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem assessing role data: ${error.message}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  async findAllWithOptions(findOptions: string): Promise<[Role[], number]> {
    try{
      return await this.roleRepository.findAndCount(JSON.parse(findOptions))

    }catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem assessing user data: ${error.message}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(id: number): Promise<Role> {
    try {
      return await this.roleRepository.findOne(id);

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem assessing role data: ${error.message}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  

  async remove(id: number):Promise<DeleteResult> {
    try{
      return await this.roleRepository.delete(id);
 
     }catch(error){
       throw new HttpException({
         status: HttpStatus.INTERNAL_SERVER_ERROR,
         error: `There was a problem deleting user data: ${error.message}`
       }, HttpStatus.INTERNAL_SERVER_ERROR)
     }
  }


  /*async addUserById(roleId: number, userId: number): Promise<void>{
    try{
      return await this.roleRepository.createQueryBuilder()
      .relation(Role, "users")
      .of(roleId)
      .add(userId)
    }catch(error){

    }
  }

  async addUsersById(roleId: number, userIds: number): Promise<void>{
    try{
      return await this.roleRepository.createQueryBuilder()
      .relation(Role, "users")
      .of(roleId)
      .add(userIds)
    }catch(error){

    }
  }

  async removeUserById(roleId: number, userId: number): Promise<void>{
    try{
      return await this.roleRepository.createQueryBuilder()
      .relation(Role, "users")
      .of(roleId)
      .remove(userId)
    }catch(error){

    }
  }

  async removeUsersById(roleId: number, userIds: number): Promise<void>{
    try{
      return await this.roleRepository.createQueryBuilder()
      .relation(Role, "users")
      .of(roleId)
      .remove(userIds)
    }catch(error){

    }
  }*/
}
