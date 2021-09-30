import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { PG_UNIQUE_CONSTRAINT_VIOLATION } from 'src/global/error.codes';
import { Connection, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UserProfile } from './entities/user-profile.entity';
import { logger } from 'src/main';

@Injectable()
export class UserProfilesService {

  constructor(
    @InjectRepository(UserProfile) private userProfileRepository: Repository<UserProfile>,
    @InjectConnection('default') private connection: Connection


  ) { }

  async create(createUserProfileDto: CreateUserProfileDto, req: any):Promise<UserProfile> {
    try {
      const newUserProfile = this.userProfileRepository.create(createUserProfileDto);

      return await this.userProfileRepository.save(newUserProfile)
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

  async findAll():Promise<[UserProfile[], number]> {
    try {
      return await this.userProfileRepository.findAndCount();

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem assessing user data: ${error.message}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAllWithOptions(findOptions: string): Promise<[UserProfile[], number]> {
    try{
      return await this.userProfileRepository.findAndCount(JSON.parse(findOptions))

    }catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem assessing user data: ${error.message}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(id: number): Promise<UserProfile> {
    try {
      return await this.userProfileRepository.findOne(id);

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem assessing user data: ${error.message}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    
  }

  async update(id: number, updateUserProfileDto: UpdateUserProfileDto):Promise<UpdateResult> {
    try {
      return await this.userProfileRepository.update(id, { ...updateUserProfileDto })

    } catch (error) {
      if (error && error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: `There was a problem with user-profile creation: ${error.message}`
        }, HttpStatus.BAD_REQUEST)
      } else

        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `There was a problem with user-profile creation: ${error.message}`
        }, HttpStatus.INTERNAL_SERVER_ERROR)

    }
    
  }

  async remove(id: number): Promise<DeleteResult> {
    try{
      return await this.userProfileRepository.delete(id);
 
     }catch(error){
       throw new HttpException({
         status: HttpStatus.INTERNAL_SERVER_ERROR,
         error: `There was a problem deleting user data: ${error.message}`
       }, HttpStatus.INTERNAL_SERVER_ERROR)
     }
  }
}
