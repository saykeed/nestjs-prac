import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Folder } from "./folder.entity.js";
import { CreateFolderDto } from "./dto/create-folder.dto.js";
import { UpdateFolderDto } from "./dto/update-folder.dto.js";

@Injectable()
export class FolderService {
    constructor(
        @InjectRepository(Folder)
        private readonly foldersRepository: Repository<Folder>
    ) {}

    createFolder(createFolderDto: CreateFolderDto) {
        return this.foldersRepository.save(
            this.foldersRepository.create({
                name: createFolderDto.name,
                user: { id: createFolderDto.userId}
            })
        )
    }

    findAll() {
        return this.foldersRepository.find()
    }

    async getFolderById(id: number) {
        const folder = await this.foldersRepository.findOne({
            where: { id },
            relations: { notes: true }
        })
        if (!folder) {
            throw new NotFoundException('Folder not found')
        }
        return folder
    }

    async updateFolder (id: number, updateFolderDto: UpdateFolderDto) {
        const folder = await this.getFolderById(id);
        Object.assign(folder, updateFolderDto)
        return this.foldersRepository.save(folder)
    }

    async deleteFolder(id: number) {
        const folder = await this.getFolderById(id)
        await this.foldersRepository.remove(folder)
    }

}
