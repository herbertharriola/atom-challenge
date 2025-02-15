import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Task } from '../models/task.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      tap(tasks => console.log("Datos recibidos de Firebase:", tasks)), 
      map(tasks => tasks.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())),
      catchError(error => {
        console.error("Error en la solicitud HTTP:", error);
        return of([]); // Retorna un array vacío para evitar errores
      })
    );
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      catchError(error => {
        console.error("Error agregando tarea:", error);
        return of(null as any);
      })
    );
  }

  updateTask(task: Task): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${task.id}`, task).pipe(
      catchError(error => {
        console.error("Error actualizando tarea:", error);
        return of();
      })
    );
  }

  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`).pipe(
      catchError(error => {
        console.error("Error eliminando tarea:", error);
        return of();
      })
    );
  }
}
