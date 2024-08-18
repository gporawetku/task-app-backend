import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  public title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  public description: string;

  @IsBoolean()
  @IsNotEmpty()
  public completed: boolean;
}
