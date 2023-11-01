import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCardDto } from 'src/card/dto/create-card.dto';
import { Card } from 'src/schemas/card.schema';
import { List } from 'src/schemas/list.schema';

@Injectable()
export class CardService {
  constructor(
    @InjectModel('Card') private readonly cardModel: Model<Card>,
    @InjectModel('List') private readonly listModel: Model<List>,
  ) {}

  public async create(listId: string, card: CreateCardDto): Promise<Card> {
    const list = await this.listModel.findById(listId).exec();

    if (!list) {
      throw new NotFoundException('List not found');
    }

    const newCard = new this.cardModel(card);
    newCard.list = list;

    list.cards.push(newCard);
    await list.save();

    return await newCard.save();
  }

  public async update(id: string, updatedCard: CreateCardDto): Promise<Card> {
    return this.cardModel
      .findByIdAndUpdate(id, updatedCard, { new: true })
      .exec();
  }

  public async delete(id: string): Promise<Card> {
    return this.cardModel.findByIdAndRemove(id).exec();
  }

  public async findAllCardsForList(listId: string): Promise<Card[]> {
    return this.cardModel.find({ list: listId }).exec();
  }

  public async findOne(id: string): Promise<Card> {
    return this.cardModel.findById(id).exec();
  }

  public async deleteAllCardsForAList(listId: string): Promise<void> {
    const list = await this.listModel.findById(listId).exec();

    if (!list) {
      throw new NotFoundException('List not found');
    }

    await this.cardModel.deleteMany({ list: listId }).exec();
  }
}
