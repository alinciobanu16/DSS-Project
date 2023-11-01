import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { List } from 'src/schemas/list.schema';

export type BoardDocument = HydratedDocument<Board>;

@Schema()
export class Board {
  @Prop()
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'List' }] })
  lists: List[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);
