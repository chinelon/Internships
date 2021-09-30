import {  Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {CountryList} from "src/global/app.enum"
import { User } from "src/users/entities/user.entity";
import { Employee } from "src/employees/entities/employee.entity";

@Entity()
export class Department {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({unique: true})
    name: string;

    @Column({nullable: true})
    description: string;

    @Column({ type: 'enum', enum: CountryList, nullable: true })
    location: CountryList;

    @JoinColumn()
    @OneToMany(() => Employee, employee => employee.department)
    employees: Employee[];
}
