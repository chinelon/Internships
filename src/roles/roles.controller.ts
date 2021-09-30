import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

     /* @param createRoleDto
      @param req

      @ApiOperation({ description: "Create new role"})
*/
  @Post()
  create(@Body() createRoleDto: CreateRoleDto, req: any) {
    return this.rolesService.create(createRoleDto, req);
  }

  @Get()
  findAll(@Query() query: string):Promise<[Role[], number]> {
    for(const queryKey of Object.keys(query)){
      if(queryKey == "find-optionns"){
        return this.rolesService.findAllWithOptions(decodeURI(query[queryKey]))
      }
    }
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
  
  /*@Patch(':roleId/users/:userId')
  addUserById(@Param('roleId')roleId: string, @Param ('userId')userId: string): Promise<void>{
    return this.rolesService.addUserById(+roleId, +userId)
  }

  @Patch(':roleId/users')
  addUsersById(@Param('roleId')roleId: string,@Query() query: string ): Promise<void>{
    return this.rolesService.addUsersById(+roleId, query['userIds'])
  }
}*/
}

