import { IsInt, IsString, MinLength } from "class-validator";

export class CreateNoteDto {
    @IsString()
    @MinLength(3)
    title: string;

    @IsString()
    body: string;

    @IsInt()
    folderId: number;
}