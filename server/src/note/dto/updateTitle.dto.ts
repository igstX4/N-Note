import {IsString, MinLength} from "class-validator";
import {accessTypes} from "../../schemas/note.schema";

export class updateTitle {
    @IsString()
    @MinLength(2)
    readonly newName: string
}