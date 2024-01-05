import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { createNoteDto } from './dto/createNote.dto';
import { InjectModel, Schema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { accessTypes, Note } from '../schemas/note.schema';
import { User } from '../schemas/user.schema';
import { TokenService } from '../token/token.service';
import { UpdateNoteDto } from './dto/updateNote.dto';
import {updateTitle} from "./dto/updateTitle.dto";

@Injectable()
export class NoteService {
  constructor(
    @InjectModel(Note.name) private noteModel: Model<Note>,
    @InjectModel(User.name) private userModel: Model<User>,
    private tokenService: TokenService,
  ) {}

  async createNote(dto: createNoteDto, authorId) {
    if (dto.access !== accessTypes.link && dto.access !== accessTypes.private) {
      throw new BadRequestException();
    }
    const user = await this.userModel.findById(authorId);
    if (!user.isActivated) {
      throw new UnauthorizedException(
        'You must confirm your account to create notes',
      );
    }
    const note = new this.noteModel({ ...dto, authorId });
    const savedNote = await note.save();
    user.createdNotes.push(savedNote._id);
    await user.save();
    return savedNote;
  }

  async getNote(noteId, token) {
    const user = await this.tokenService.validateAccessToken(token);

    const note = await this.noteModel.findById(noteId);
    if (!note) {
      throw new BadRequestException();
    }
    if (
      note.access === accessTypes.private &&
      String(note.authorId) !== user?.id
    ) {
      throw new UnauthorizedException('You cant access this note');
    }
    return note;
  }
  async deleteNote(noteId, userId) {
    const note = await this.noteModel.findById(noteId);
    const user = await this.userModel.findById(userId);
    if (!note) {
      throw new BadRequestException();
    }
    if (String(note.authorId) !== String(user._id)) {
      throw new UnauthorizedException();
    }
    return this.noteModel.deleteOne({ _id: noteId });
  }
  async updateNote(dto: UpdateNoteDto, noteId, userId) {
    if (dto.access !== accessTypes.link && dto.access !== accessTypes.private) {
      throw new BadRequestException();
    }
    const note = await this.noteModel.findById(noteId);
    if (!note) {
      throw new BadRequestException();
    }
    console.log(String(note.authorId), String(userId));
    if (String(note.authorId) !== userId) {
      throw new UnauthorizedException();
    }
    note.text = dto.text;
    note.access = dto.access;
    return note.save();
  }
  async updateTitle(dto: updateTitle, userId, noteId) {
      const note = await this.noteModel.findById(noteId)
      if (userId !== String(note.authorId)) {
        throw new UnauthorizedException()
      }
      note.name = dto.newName
    return note.save()

  }
}
