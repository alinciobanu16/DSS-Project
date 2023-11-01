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
import { CardService } from 'src/card/card.service';
import { CreateCardDto } from 'src/card/dto/create-card.dto';

@Controller(['boards/:boardId/lists/:listId/cards', 'cards'])
export class CardController {
  constructor(@Inject(CardService) private readonly cardService: CardService) {}

  @Get()
  public async getCards(@Param('listId') listId: string) {
    return this.cardService.findAllCardsForList(listId);
  }

  @Get(':cardId')
  public async getCard(@Param('cardId') cardId: string) {
    return this.cardService.findOne(cardId);
  }

  @Post()
  public async createCard(
    @Param('listId') listId: string,
    @Body() card: CreateCardDto,
  ) {
    return this.cardService.create(listId, card);
  }

  @Patch(':cardId')
  public async updateCard(
    @Param('cardId') cardId: string,
    @Body() card: CreateCardDto,
  ) {
    return this.cardService.update(cardId, card);
  }

  @Delete(':cardId')
  public async deleteCard(@Param('cardId') cardId: string) {
    return this.cardService.delete(cardId);
  }
}
