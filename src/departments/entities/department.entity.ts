import {  Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {CountryList} from "src/global/app.enum"
import { User } from "src/users/entities/user.entity";

@Entity()
export class Department {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({unique: true})
    name: string;

    @Column({nullable: true})
    description: string;

    @Column()
    location: CountryList;

    @JoinColumn()
    @OneToMany(() => User, user => user.department)
    users: User[];
}
