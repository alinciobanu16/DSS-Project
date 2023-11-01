import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardController } from 'src/card/card.controller';
import { CardService } from 'src/card/card.service';
import { ListModule } from 'src/list/list.module';
import { CardSchema } from 'src/schemas/card.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Card', schema: CardSchema }]),
    forwardRef(() => ListModule),
  ],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService, MongooseModule],
})
export class CardModule {}
