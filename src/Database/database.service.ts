import { MongoClient } from 'mongodb';
import { Injectable } from '@nestjs/common/decorators';

@Injectable()
export class DatabaseService {
  private client: MongoClient;

  async connect() {
    try {
      const uri =process.env.DB_URL
      this.client = new MongoClient(uri);
      await this.client.connect();
      console.log('Connected to database successfully!');
    } catch (error) {
      console.log('error Occur While connection to database', error);
    }
  }
  getDb(databaseName: string) {
    return this.client.db(databaseName);
  }
  async close() {
    await this.client.close();
    console.log('Disconnected Successfully  from database');
  }
}
