import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Note } from "./note.entity.js";
import { Like, Repository } from "typeorm";
import { FolderService } from "../folders/folder.service.js";
import { CreateNoteDto } from "./dto/create-note.dto.js";
import { ListNoteDto } from "./dto/list-notes.dto.js";

@Injectable()
export class NoteService {
    constructor(
        @InjectRepository(Note)
        private readonly notesRepository: Repository<Note>,
        private readonly folderService: FolderService
    ) {}

    async createNote(userId: number, createNoteDto: CreateNoteDto) {
        await this.folderService.getFolderById(createNoteDto.folderId, userId)

        return this.notesRepository.save(
            this.notesRepository.create({
                title: createNoteDto.title,
                body: createNoteDto.body,
                folder: { id: createNoteDto.folderId }
            })
        )
    }

    
    async findAllNotes (userId: number, query: ListNoteDto) {
        const page = query.page ?? 1;
        const limit = query?.limit ?? 10;

        const [data, total] =  await this.notesRepository.findAndCount({
            where: {
                folder: { user: { id: userId } },
                ...(query.search ? {title: Like(`%${query.search}%`)} : {})
            },
            order: { createdAt: 'DESC'},
            skip: (page-1) * limit,
            take: limit
        })

        return { data, total}
    }
}