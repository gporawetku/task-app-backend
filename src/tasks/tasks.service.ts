import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task: Task = await this.taskRepository.save(createTaskDto);
    return task;
  }

  async findAll(): Promise<Task[]> {
    const tasks: Task[] = await this.taskRepository.find();
    return tasks;
  }

  async findOne(id: number): Promise<Task> {
    const task: Task = await this.taskRepository.findOneBy({ id: id });
    if (!task)
      throw new HttpException("Task doesn't exist", HttpStatus.CONFLICT);
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.findOne(id);
    await this.taskRepository.update(id, updateTaskDto);

    const task: Task = await this.findOne(id);
    return task;
  }

  async remove(id: number) {
    const task: Task = await this.findOne(id);
    await this.taskRepository.delete({ id: id });
    return task;
  }
}
