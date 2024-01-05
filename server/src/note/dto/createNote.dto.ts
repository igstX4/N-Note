import { accessTypes } from "../../schemas/note.schema";
import { MinLength, IsString, IsBoolean } from "class-validator";

export class createNoteDto {
  @IsString()
  @MinLength(2)
  readonly name: string
  @IsString()
  readonly text : string
  readonly access : accessTypes
}