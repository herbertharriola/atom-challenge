import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { Task } from '../../models/task.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  displayedColumns: string[] = [
    'title',
    'description',
    'createdAt',
    'completed',
    'actions',
  ];
  dataSource = new MatTableDataSource<Task>();
  newTask: Task = {
    title: '',
    description: '',
    completed: false,
    createdAt: new Date(),
    deleted: false,
  };
  isLoading: boolean = true;

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading = true; // 🔹 Mostrar spinner mientras carga
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.dataSource.data = tasks.filter((task) => !task.deleted); // 🔹 No mostrar eliminados
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error cargando tareas:', error);
    },
    });
  }

  async addTask() {
    if (!this.newTask.title.trim()) return;

    const task: Task = {
      title: this.newTask.title,
      description: this.newTask.description || '',
      completed: false,
      createdAt: new Date(),
      deleted: false,
    };

    try {
      await this.taskService.addTask(task);
      this.newTask = {
        title: '',
        description: '',
        completed: false,
        createdAt: new Date(),
        deleted: false,
      };
    } catch (error) {
      console.error('Error agregando tarea:', error);
    }
  }

  async updateTask(task: Task) {
    if (!task.id) return;

    try {
      task.completed = !task.completed;
      await this.taskService.updateTask(task);
    } catch (error) {
      console.error('Error actualizando tarea:', error);
    }
  }

  async deleteTask(taskId: string) {
    if (!taskId) return;

    try {
      await this.taskService.deleteTask(taskId);
    } catch (error) {
      console.error('Error eliminando tarea:', error);
    }
  }

  logout() {
    this.authService.logout();
  }
}
