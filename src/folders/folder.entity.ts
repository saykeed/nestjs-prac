import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, type Relation } from 'typeorm';
import { User } from '../users/user.entity.js';
import { Note } from '../notes/note.entity.js';

@Entity({ name: 'folders' })
export class Folder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.folders, { onDelete: 'CASCADE'})
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;

  @OneToMany(() => Note, (note) => note.folder)
  notes: Relation<Note[]>

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}