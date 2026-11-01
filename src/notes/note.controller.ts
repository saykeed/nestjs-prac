import { Body, Controller, Get, Post, Query, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { NoteService } from "./note.service.js";
import { CreateNoteDto } from "./dto/create-note.dto.js";
import { JwtAuthGuard } from "../auth/jwt-auth.guard.js";
import { ListNoteDto } from "./dto/list-notes.dto.js";

type requestType = { user: { userId: number; email: string } }
@Controller('notes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NoteController {
    constructor(private readonly noteService: NoteService) {}

    @Post()
    create(
        @Body() createNoteDto: CreateNoteDto,
        @Request() req: requestType
    ) {
        return this.noteService.createNote(req?.user?.userId, createNoteDto)
    }

    @Get()
    findAll(@Request() req: requestType, @Query() query: ListNoteDto) {
        return this.noteService.findAllNotes(req?.user?.userId, query)
    }
}