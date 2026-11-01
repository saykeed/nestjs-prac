import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { FolderService } from "./folder.service.js";
import { CreateFolderDto } from "./dto/create-folder.dto.js";
import { UpdateFolderDto } from "./dto/update-folder.dto.js";
import { JwtAuthGuard } from "../auth/jwt-auth.guard.js";

type requestType = { user: { userId: number; email: string } }
@Controller('folders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FolderController {
    constructor (private readonly folderService: FolderService) {}

    @Post()
    create (
        @Request() req: requestType,
        @Body() createFolderDto: CreateFolderDto
    ) {
        return this.folderService.createFolder(req?.user?.userId, createFolderDto)
    }

    @Get()
    getAll(@Request() req: requestType) {
        return this.folderService.findAll(req?.user?.userId)
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number, @Request() req: requestType) {
        return this.folderService.getFolderById(id, req?.user?.userId)
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateFolderDto: UpdateFolderDto,
        @Request() req: requestType
    ) {
        return this.folderService.updateFolder(id, req?.user?.userId, updateFolderDto)
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id:number, @Request() req: requestType) {
        return this.folderService.deleteFolder(id, req?.user?.userId)
    }
}