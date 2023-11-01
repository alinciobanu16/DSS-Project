import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBoardDto } from 'src/board/dto/create-board.dto';
import { ListService } from 'src/list/list.service';
import { Board } from 'src/schemas/board.schema';
import { List } from 'src/schemas/list.schema';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel('Board') private readonly boardModel: Model<Board>,
    @Inject(ListService) private readonly listService: ListService,
  ) {}

  public async create(board: CreateBoardDto): Promise<Board> {
    const newBoard = new this.boardModel(board);
    return await newBoard.save();
  }

  public async findAll(): Promise<Board[]> {
    return await this.boardModel.find().exec();
  }

  public async findOne(boardId: string): Promise<Board> {
    return await this.boardModel.findById(boardId).exec();
  }

  public async update(
    boardId: string,
    updatedBoard: CreateBoardDto,
  ): Promise<Board> {
    return await this.boardModel
      .findByIdAndUpdate(boardId, updatedBoard, { new: true })
      .exec();
  }

  public async delete(boardId: string): Promise<void> {
    await this.listService.deleteAllListsForABoard(boardId);
    await this.boardModel.findByIdAndRemove(boardId).exec();
  }
}
