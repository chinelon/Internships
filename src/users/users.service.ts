import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { PG_UNIQUE_CONSTRAINT_VIOLATION } from 'src/global/error.codes';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>


  ) { }
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(createUserDto);

      //hash the password in the dto sent
      await bcrypt.hash(newUser.passwordHash, 10).then((hash: string) => {
        newUser.passwordHash = hash
      })

      const user = await this.userRepository.save(newUser)

      return user;

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

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    try {
      if (updateUserDto.passwordHash != '') {
        await bcrypt.hash(updateUserDto.passwordHash, 10).then((hash: string) => {
          updateUserDto.passwordHash = hash
        })
      }
      return await this.userRepository.update(id, { ...updateUserDto })

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

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem assessing user data: ${error.message}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.userRepository.findOne(id);

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem assessing user data: ${error.message}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try{
     return await this.userRepository.delete(id);

    }catch(error){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem deleting user data: ${error.message}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  /**Relationships */
  async addRoleById(userId: number, roleId: number): Promise<void>{
    try{
      return await this.userRepository.createQueryBuilder()
      .relation(User, "roles")
      .of(userId)
      .add(roleId)
    }catch(error){

    }
  }

  async addRolesById(userId: number, roleIds: number[]): Promise<void>{
    try{
      return await this.userRepository.createQueryBuilder()
      .relation(User, "roles")
      .of(userId)
      .add(roleIds)
    }catch(error){

    }
  }

  async removeRoleById(userId: number, roleId: number): Promise<void>{
    try{
      return await this.userRepository.createQueryBuilder()
      .relation(User, "roles")
      .of(userId)
      .remove(roleId)
    }catch(error){

    }
  }

  async removeRolesById(userId: number, roleIds: number[]): Promise<void>{
    try{
      return await this.userRepository.createQueryBuilder()
      .relation(User, "roles")
      .of(userId)
      .remove(roleIds)
    }catch(error){

    }
  }

  async setUserProfileById(userId: number, userProfileId: number): Promise<void>{
    try{
      return await this.userRepository.createQueryBuilder()
      .relation(User, "userProfile")
      .of(userId)
      .set(userProfileId)

    }catch(error){
      
    }
  }

  async unsetUserProfileById(userId: number): Promise<void>{
    try{
      return await this.userRepository.createQueryBuilder()
      .relation(User, "userProfile")
      .of(userId)
      .set(null)

    }catch(error){
      
    }
  }
}
