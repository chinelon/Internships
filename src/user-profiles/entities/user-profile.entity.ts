import { User } from "src/users/entities/user.entity";
import {  Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class UserProfile {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ nullable: true })
    photo: string; //photo file location. Use stream to send

    @Column({ nullable: true })
    photoMimeType: string;

    @Column()
    userId: number;

    @OneToOne(() => User, user => user.userprofile, {cascade:true})
    @JoinColumn({name: 'userId'})
    user: User;
}
