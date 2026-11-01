import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class ListNoteDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?:number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    limit?:number;

    @IsOptional()
    @IsString()
    search?: string;
}