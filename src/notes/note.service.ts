import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Note } from "./note.entity.js";
import { Repository } from "typeorm";
import { FolderService } from "../folders/folder.service.js";
import { CreateNoteDto } from "./dto/create-note.dto.js";

@Injectable()
export class NoteService {
    constructor(
        @InjectRepository(Note)
        private readonly notesRepository: Repository<Note>,
        private readonly folderService: FolderService
    ) {}

    async createNote(createNoteDto: CreateNoteDto) {
        await this.folderService.getFolderById(createNoteDto.folderId)

        return this.notesRepository.save(
            this.notesRepository.create({
                title: createNoteDto.title,
                body: createNoteDto.body,
                folder: { id: createNoteDto.folderId }
            })
        )
    }
}