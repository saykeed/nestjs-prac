import { Column, Entity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, type Relation } from 'typeorm'
import { Exclude } from 'class-transformer'
import { Folder } from '../folders/folder.entity.js';

@Entity({ name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true})
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    username: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Folder, (folder) => folder.user)
    folders: Relation<Folder[]>;
}
