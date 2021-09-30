import { Department } from "src/departments/entities/department.entity";
import { User } from "src/users/entities/user.entity";
import {  Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ nullable: true }) //nullable just in case it is not allocated from the very beginning. 
    employeeNumber: string

    @Column()
    firstName: string

    @Column({ nullable: true })
    middleName: string

    @Column()
    lastName: string

    @Column({ nullable: true })
    jobPosition: string

    @Column({ nullable: true })
    jobTitle: string

    @Column({ nullable: true })
    photo: string

    @OneToOne(() => User, user => user.employee, {cascade: true})
    @JoinColumn({name: 'userId'})
    user: User;

    @Column({nullable:true})
    userId: number;

    @Column({nullable:true})
    departmentId: number;

    @ManyToOne(()=> Department, department => department.employees)
    @JoinColumn({name: 'departmentId'})
    department: Department;

}
