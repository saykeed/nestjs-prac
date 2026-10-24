import { Body, Controller, Post } from "@nestjs/common";
import { NoteService } from "./note.service.js";
import { CreateNoteDto } from "./dto/create-note.dto.js";

@Controller('notes')
export class NoteController {
    constructor(private readonly noteService: NoteService) {}

    @Post()
    create(@Body() createNoteDto: CreateNoteDto) {
        return this.noteService.createNote(createNoteDto)
    }
}