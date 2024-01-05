import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { createNoteDto } from './dto/createNote.dto';
import { NoteService } from './note.service';
import { UserId } from '../decorators/user-email.decorator';
import { JwtAuthGuard } from '../user/guards/jwt.guard';
import { Request } from 'express';
import { UpdateNoteDto } from './dto/updateNote.dto';
import {updateTitle} from "./dto/updateTitle.dto";
@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}
  @Get(':id')
  async getNoteById(@Param('id') id, @Req() req: Request) {
    return this.noteService.getNote(
      id,
      req.headers.authorization?.split(' ')[1],
    );
  }
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createNote(@Body() dto: createNoteDto, @UserId() id) {
    return this.noteService.createNote(dto, id);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteNote(@Param('id') id, @UserId() userId) {
    return this.noteService.deleteNote(id, userId);
  }
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async updateTitle(@Param('id') noteId, @Body() dto : updateTitle, @UserId() userId,) {
      return this.noteService.updateTitle(dto, userId, noteId)
  }


  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateNote(
    @Param('id') id,
    @Body() dto: UpdateNoteDto,
    @UserId() userId,
  ) {
    return this.noteService.updateNote(dto, id, userId);
  }
}
