import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() updateTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<string>();

  toggleCompletion() {
    this.updateTask.emit({ ...this.task, completed: !this.task.completed });
  }

  removeTask() {
    if (this.task.id) {
      this.deleteTask.emit(this.task.id);
    }
  }
}
