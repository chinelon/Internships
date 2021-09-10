import {  Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import {FunctionalArea} from "src/global/app.enum"
import { User } from "src/users/entities/user.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({unique: true})
    name: string;

    @Column({nullable: true})
    description: string;

    @Column({ type: 'enum', enum: FunctionalArea, nullable: true, default:FunctionalArea.OTR})
    functionalArea: FunctionalArea;

    @JoinTable()
    @ManyToMany(() => User, user => user.roles)
    users: User[];
}
