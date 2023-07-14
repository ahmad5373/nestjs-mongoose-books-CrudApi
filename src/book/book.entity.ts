import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  no_of_pages: number;

  @Prop()
  published_at: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
