import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, collectionData } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksCollection = collection(this.firestore, 'tasks');

  constructor(private firestore: Firestore) {}

  getTasks(): Observable<Task[]> {
    return collectionData(this.tasksCollection, { idField: 'id' }).pipe(
      map((tasks: any[]) =>
        tasks
          .map((task) => ({
            ...task,
            createdAt: task.createdAt?.seconds
              ? new Date(task.createdAt.seconds * 1000)
              : task.createdAt,
          }))
          .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      )
    ) as Observable<Task[]>;
  }
  

  addTask(task: Task): Promise<void> {
    return addDoc(this.tasksCollection, task).then(() => {});
  }

  updateTask(task: Task): Promise<void> {
    const taskDoc = doc(this.firestore, `tasks/${task.id}`);
    return updateDoc(taskDoc, {
      completed: task.completed,
      title: task.title,
      description: task.description,
    });
  }

  deleteTask(taskId: string): Promise<void> {
    const taskDoc = doc(this.firestore, `tasks/${taskId}`);
    return updateDoc(taskDoc, { deleted: true });
  }
}
