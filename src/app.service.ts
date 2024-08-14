import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

export interface Tasks {
  id: number;
  name: string;
  completed: boolean;
}

@Injectable()
export class AppService {
  private tasks: Array<Tasks>;

  constructor() {
    this.tasks = this.readTasksFromFile();
  }

  private readTasksFromFile(): Tasks[] {
    try {
      return JSON.parse(fs.readFileSync('tasks.json', 'utf8'));
    } catch (error) {
      return [];
    }
  }

  private saveTasksToFile() {
    fs.writeFileSync('tasks.json', JSON.stringify(this.tasks));
  }

  getTasks(): Tasks[] {
    return this.tasks;
  }

  createTask(name: string): Tasks[] {
    const task = { id: this.tasks.length + 1, name, completed: false };
    this.tasks.push(task);
    this.saveTasksToFile();
    return this.tasks;
  }

  deleteTask(id: number): Tasks[] {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.saveTasksToFile();
    }
    return this.tasks;
  }
}
