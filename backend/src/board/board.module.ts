import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardController } from 'src/board/board.controller';
import { BoardService } from 'src/board/board.service';
import { ListModule } from 'src/list/list.module';
import { BoardSchema } from 'src/schemas/board.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Board', schema: BoardSchema }]),
    forwardRef(() => ListModule),
  ],
  controllers: [BoardController],
  providers: [BoardService],
  exports: [BoardService, MongooseModule],
})
export class BoardModule {}
