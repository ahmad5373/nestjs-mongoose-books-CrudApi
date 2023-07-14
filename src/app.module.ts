import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './Database/database.module';
import { DatabaseService } from './Database/database.service';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv'
dotenv.config()
@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.DB_connectionURL,
    ),
    DatabaseModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly databaseService: DatabaseService) {
    this.connectToDatabase();
  }
  async connectToDatabase() {
    await this.databaseService.connect()
  }
}