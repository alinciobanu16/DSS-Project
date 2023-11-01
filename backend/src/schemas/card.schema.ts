import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { List } from 'src/schemas/list.schema';
import { Types } from 'mongoose';

@Schema()
export class Card {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'List' }] })
  list: List;
}

export const CardSchema = SchemaFactory.createForClass(Card);
