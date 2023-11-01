import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Board } from 'src/schemas/board.schema';
import { Card } from 'src/schemas/card.schema';

@Schema()
export class List {
  @Prop()
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Card' }] })
  cards: Card[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Board' }] })
  board: Board;
}

export const ListSchema = SchemaFactory.createForClass(List);
