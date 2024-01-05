import { createNoteDto } from "./createNote.dto";
import { IsString } from "class-validator";
import {accessTypes} from "../../schemas/note.schema";

export class UpdateNoteDto {
    readonly text : string
    readonly access : accessTypes
}