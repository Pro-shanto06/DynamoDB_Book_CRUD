import {
  PutItemCommand,
  GetItemCommand,
  ScanCommand,
  UpdateItemCommand,
  DeleteItemCommand,
  DynamoDBClient
} from '@aws-sdk/client-dynamodb';
import { v4 as uuid } from 'uuid';
import 'dotenv/config';
import { dynamoDBClient } from '../aws-config/dynamoDBClient';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';

const { TABLE_NAME } = process.env;

@Injectable()
export class BookService {
  private readonly client: DynamoDBClient = dynamoDBClient();

  async create(createBookDto: CreateBookDto) {
    try {
      await this.client.send(new PutItemCommand({
        TableName: TABLE_NAME,
        Item: {
          bookId: { S: uuid() },
          title: { S: createBookDto.title },
          author: { S: createBookDto.author },
          publicationYear: { N: createBookDto.publicationYear.toString() },
        },
      }));
      return { message: 'Book created successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create book');
    }
  }

  async findAll() {
    try {
      const results = await this.client.send(new ScanCommand({
        TableName: TABLE_NAME,
      }));
      return results.Items;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve books');
    }
  }

  async findOne(bookId: string) {
    try {
      const result = await this.client.send(new GetItemCommand({
        TableName: TABLE_NAME,
        Key: { bookId: { S: bookId } },
      }));

      if (!result.Item) {
        throw new NotFoundException(`Book with ID ${bookId} not found`);
      }

      return result.Item;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to retrieve book');
      }
    }
  }

  async update(bookId: string, updateBookDto: UpdateBookDto) {
    try {
      const existingBook = await this.findOne(bookId);

      if (!existingBook) {
        throw new NotFoundException(`Book with ID ${bookId} not found`);
      }

      const updated = await this.client.send(new UpdateItemCommand({
        TableName: TABLE_NAME,
        Key: { bookId: { S: bookId } },
        UpdateExpression: 'set #title = :title, author = :author, publicationYear = :publicationYear',
        ExpressionAttributeNames: {
          '#title': 'title',
        },
        ExpressionAttributeValues: {
          ':title': { S: updateBookDto.title },
          ':author': { S: updateBookDto.author },
          ':publicationYear': { N: updateBookDto.publicationYear.toString() },
        },
        ReturnValues: 'ALL_NEW',
      }));

      return updated.Attributes;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to update book');
      }
    }
  }

  async remove(bookId: string) {
    try {
      const existingBook = await this.findOne(bookId);

      if (!existingBook) {
        throw new NotFoundException(`Book with ID ${bookId} not found`);
      }

      await this.client.send(new DeleteItemCommand({
        TableName: TABLE_NAME,
        Key: { bookId: { S: bookId } },
      }));

      return { message: 'Book deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to delete book');
      }
    }
  }
}
