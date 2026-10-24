import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, type Relation } from "typeorm";
import { Folder } from "../folders/folder.entity.js";

@Entity({ name: 'notes'})
export class Note {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text'})
    body: string;

    @ManyToOne(() => Folder, (folder) => folder.notes, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'folderId' })
    folder: Relation<Folder>;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}