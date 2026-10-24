import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { FolderService } from "./folder.service.js";
import { CreateFolderDto } from "./dto/create-folder.dto.js";
import { UpdateFolderDto } from "./dto/update-folder.dto.js";

@Controller('folders')
export class FolderController {
    constructor (private readonly folderService: FolderService) {}

    @Post()
    create (@Body() createFolderDto: CreateFolderDto) {
        return this.folderService.createFolder(createFolderDto)
    }

    @Get()
    getAll() {
        return this.folderService.findAll()
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.folderService.getFolderById(id)
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateFolderDto: UpdateFolderDto,
    ) {
        return this.folderService.updateFolder(id, updateFolderDto)
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id:number) {
        return this.folderService.deleteFolder(id)
    }
}