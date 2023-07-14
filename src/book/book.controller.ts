import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Res,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { BookService } from './book.service';
// import { Book } from './book.entity';
import { isValidObjectId } from 'mongoose';
import { Response } from 'express';
import { CreateBookDto } from './dto/create-book.dto';

// Define End point for api call  'book'
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // Api Call For fetch  list of book from database
  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    try {
      const allBooks = await this.bookService.findAll();
      res.status(HttpStatus.OK).json(allBooks);
    } catch (error) {
      // Handle any exceptions thrown during findAll() method
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Internal Server Error',
      });
    }
  }

  //Api call to Get Book detail with Specific Id
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      if (!isValidObjectId(id)) {
        throw new BadRequestException('Invalid book ID');
      }
      const book = await this.bookService.findOne(id);
      if (!book) {
        throw new NotFoundException('Book not found');
      }
      res.status(HttpStatus.OK).json(book);
    } catch (error) {
      // Handle specific exceptions thrown during findOne() method
      if (error instanceof BadRequestException) {
        res.status(HttpStatus.BAD_REQUEST).json({
          error: 'Invalid book ID',
        });
      } else if (error instanceof NotFoundException) {
        res.status(HttpStatus.NOT_FOUND).json({
          error: 'Book not found',
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: 'Internal Server Error',
        });
      }
    }
  }
  @Post("createBook")
  async create(
    @Body() createBookDto: CreateBookDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const CreatedBook = await this.bookService.create(createBookDto);
      res.status(HttpStatus.CREATED).json({
        message: 'Book Data Created Successfully',
        data: CreatedBook,
      });
    } catch (error) {
      res.status(400).json({
        error: 'Error',
        Message: error.message,
      });
    }
  }

  //Api call to get data from db with Id and  update that  data
  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() createBookDto: CreateBookDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      if (!isValidObjectId(id)) {
        throw new BadRequestException('Invalid book ID');
      }
      const updatedBook = await this.bookService.update(id, createBookDto);
      res.status(HttpStatus.OK).json({
      message: "Book Updated successfully.",
      Data: updatedBook});
    } catch (error) {
      error instanceof NotFoundException;
      res.status(HttpStatus.NOT_FOUND).json({
        error: 'Book not found',
      });
    }
  }

  // api call to delete Book Data with specific Id
  @Delete('delete/:id')
  async delete(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      if (!isValidObjectId(id)) {
        throw new BadRequestException('Invalid book ID');
      }
      await this.bookService.delete(id);
      res.status(HttpStatus.OK).json({
        message: `Book Data is deleted successfully with Id ${id}`,
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: error.message,
      });
    }
  }
}
