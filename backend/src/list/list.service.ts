import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CardService } from 'src/card/card.service';
import { CreateListDto } from 'src/list/dto/create-list.dto';
import { UpdateListDto } from 'src/list/dto/update-list.dto';
import { Board } from 'src/schemas/board.schema';
import { Card } from 'src/schemas/card.schema';
import { List } from 'src/schemas/list.schema';

@Injectable()
export class ListService {
  constructor(
    @InjectModel('List') private readonly listModel: Model<List>,
    @InjectModel('Board') private readonly boardModel: Model<Board>,
    @InjectModel('Card') private readonly cardModel: Model<Card>,
    @Inject(CardService) private readonly cardService: CardService,
  ) {}

  public async create(boardId: string, list: CreateListDto): Promise<List> {
    const board = await this.boardModel.findById(boardId).exec();

    if (!board) {
      throw new NotFoundException('Board not found');
    }

    const newList = new this.listModel(list);
    newList.board = board;

    board.lists.push(newList);
    await board.save();

    return await newList.save();
  }

  public async findAll(): Promise<List[]> {
    return await this.listModel.find().exec();
  }

  public async findAllListForBoard(boardId: string): Promise<List[]> {
    return await this.listModel
      .find({ board: boardId })
      .populate('cards')
      .exec();
  }

  public async findOne(listId: string): Promise<List> {
    return await this.listModel.findById(listId).exec();
  }

  public async update(
    listId: string,
    updatedList: UpdateListDto,
  ): Promise<List> {
    return await this.listModel
      .findByIdAndUpdate(listId, updatedList, { new: true })
      .exec();
  }

  public async delete(listId: string): Promise<void> {
    await this.cardService.deleteAllCardsForAList(listId);
    await this.listModel.findByIdAndRemove(listId).exec();
  }

  public async deleteAllListsForABoard(boardId: string): Promise<void> {
    const board = await this.boardModel.findById(boardId).exec();

    if (!board) {
      throw new NotFoundException('Board not found');
    }

    const lists = await this.listModel.find({ board: boardId }).exec();

    for (const list of lists) {
      await this.cardService.deleteAllCardsForAList(list.id);
    }

    await this.listModel.deleteMany({ board: boardId }).exec();
  }
}
