import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Folder } from "./folder.entity.js";
import { FolderController } from "./folder.controller.js";
import { FolderService } from "./folder.service.js";

@Module({
    imports: [TypeOrmModule.forFeature([Folder])],
    controllers: [FolderController],
    providers: [FolderService],
    exports: [FolderService]
})

export class FolderModule {}