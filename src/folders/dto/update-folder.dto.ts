import { PartialType } from "@nestjs/swagger";
import { CreateFolderDto } from "./create-folder.dto.js";

export class UpdateFolderDto extends PartialType(CreateFolderDto) {}