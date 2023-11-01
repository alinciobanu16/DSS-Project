import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BoardService } from 'src/board/board.service';
import { CreateBoardDto } from 'src/board/dto/create-board.dto';

@Controller('boards')
export class BoardController {
  constructor(
    @Inject(BoardService) private readonly boardService: BoardService,
  ) {}

  @Get()
  public async getBoards() {
    return this.boardService.findAll();
  }

  @Get(':boardId')
  public async getBoard(@Param('boardId') boardId: string) {
    return this.boardService.findOne(boardId);
  }

  @Post()
  public async createBoard(@Body() board: CreateBoardDto) {
    return this.boardService.create(board);
  }

  @Patch(':boardId')
  public async updateBoard(
    @Param('boardId') boardId: string,
    @Body() board: CreateBoardDto,
  ) {
    return this.boardService.update(boardId, board);
  }

  @Delete(':boardId')
  public async deleteBoard(@Param('boardId') boardId: string) {
    return this.boardService.delete(boardId);
  }
}
