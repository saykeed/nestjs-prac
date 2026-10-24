import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Note } from "./note.entity.js";
import { FolderModule } from "../folders/folder.module.js";
import { NoteController } from "./note.controller.js";
import { NoteService } from "./note.service.js";

@Module({
    imports: [TypeOrmModule.forFeature([Note]), FolderModule],
    controllers: [NoteController],
    providers: [NoteService]
})

export class NotesModule {}