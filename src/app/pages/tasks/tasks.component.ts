import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { Task } from '../../models/task.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'createdAt', 'completed', 'actions'];
  dataSource = new MatTableDataSource<Task>();
  newTask: Task = { title: '', description: '', completed: false, createdAt: new Date() };
  isLoading: boolean = true;

  constructor(private taskService: TaskService, private authService: AuthService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      console.log("Tareas obtenidas:", tasks); // Verifica si Firebase devuelve datos
      this.dataSource.data = tasks;
      this.isLoading = false;
    }, error => {
      console.error("Error obteniendo tareas:", error);
    });
  }

  async addTask() {
    if (!this.newTask.title.trim()) return;

    const task: Task = {
      title: this.newTask.title,
      description: this.newTask.description || '',
      completed: false,
      createdAt: new Date()
    };

    console.log("Agregando tarea:", task); // Verifica si se está enviando bien

    try {
      await this.taskService.addTask(task).toPromise();
      console.log("Tarea agregada correctamente");

      // Volver a cargar tareas después de agregar
      this.loadTasks();

      // Limpiar el formulario después de agregar
      this.newTask = { title: '', description: '', completed: false, createdAt: new Date() };
    } catch (error) {
      console.error("Error agregando tarea:", error);
    }
  }

  updateTask(task: Task) {
    if (!task.id) return;

    this.taskService.updateTask(task).subscribe(() => {
      console.log(`Tarea ${task.id} actualizada`);
    }, error => {
      console.error("Error actualizando tarea:", error);
    });
  }
  

  async deleteTask(taskId: string) {
    if (!taskId) return; // Verifica que haya un ID válido
  
    try {
      await this.taskService.deleteTask(taskId).toPromise();
      console.log(`Tarea con ID ${taskId} eliminada`);
  
      // 🔹 Actualiza la lista de tareas eliminando la tarea sin recargar desde Firebase
      this.dataSource.data = this.dataSource.data.filter(task => task.id !== taskId);
    } catch (error) {
      console.error("Error eliminando tarea:", error);
    }
  }

  logout() {
    this.authService.logout();
  }
}
