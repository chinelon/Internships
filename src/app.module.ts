import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { EmployeesModule } from './employees/employees.module';
import { DepartmentsModule } from './departments/departments.module';
import { UserProfilesModule } from './user-profiles/user-profiles.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forRoot(), UsersModule, RolesModule, EmployeesModule, DepartmentsModule, UserProfilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
