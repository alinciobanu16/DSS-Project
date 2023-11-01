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
import { CreateListDto } from 'src/list/dto/create-list.dto';
import { ListService } from 'src/list/list.service';
import { List } from 'src/schemas/list.schema';

@Controller(['boards/:boardId/lists', 'lists'])
export class ListController {
  constructor(@Inject(ListService) private readonly listService: ListService) {}

  @Get()
  public async findAll(@Param('boardId') boardId: string): Promise<List[]> {
    return this.listService.findAllListForBoard(boardId);
  }

  @Get(':listId')
  public async getList(@Param('listId') listId: string) {
    return this.listService.findOne(listId);
  }

  @Post()
  public async createList(
    @Param('boardId') boardId: string,
    @Body() list: CreateListDto,
  ) {
    return this.listService.create(boardId, list);
  }

  @Patch(':listId')
  public async updateList(
    @Param('listId') listId: string,
    @Body() list: CreateListDto,
  ) {
    return this.listService.update(listId, list);
  }

  @Delete(':listId')
  public async deleteList(@Param('listId') listId: string) {
    return this.listService.delete(listId);
  }
}
