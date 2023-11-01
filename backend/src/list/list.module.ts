import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardModule } from 'src/board/board.module';
import { CardModule } from 'src/card/card.module';
import { ListController } from 'src/list/list.controller';
import { ListService } from 'src/list/list.service';
import { ListSchema } from 'src/schemas/list.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'List', schema: ListSchema }]),
    forwardRef(() => BoardModule),
    forwardRef(() => CardModule),
  ],
  controllers: [ListController],
  providers: [ListService],
  exports: [ListService, MongooseModule],
})
export class ListModule {}
