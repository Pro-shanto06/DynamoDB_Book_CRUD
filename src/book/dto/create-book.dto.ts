import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsInt()
  @Min(1000) 
  publicationYear: number;
}
