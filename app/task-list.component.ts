import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from './task.model';

@Component({
  selector: 'task-list',
  template: `
  <select (change)="onChange($event.target.value)">
    <option value="allTasks">All Tasks</option>
    <option value="completedTasks">Completed Tasks</option>
    <option value="incompleteTasks" selected="selected">Incomplete Tasks</option>
  </select>
  <ul>
    <li (click)="isDone(currentTask)" [class]="priorityColor(currentTask)" *ngFor="let currentTask of childTaskList | completeness:filterByCompleteness">{{currentTask.description}} {{currentTask.priority}}
    <input *ngIf="currentTask.done === true" type="checkbox" checked (click) ="toggleDone(currentTask, false)"/>
    <input *ngIf="currentTask.done === false" type="checkbox" (click) ="toggleDone(currentTask, true)"/>
    <button (click)="editButtonHasBeenClicked(currentTask)">Edit!</button></li>
  </ul>
  `
})

export class TaskListComponent {
  @Input() childTaskList: Task[];
  @Output() clickSender = new EventEmitter();

  filterByCompleteness: string = "incompleteTasks";

  editButtonHasBeenClicked(tasktoEdit: Task) {
    this.clickSender.emit(tasktoEdit);
  }

  onChange(optionFromMenu) {
    this.filterByCompleteness = optionFromMenu;
  }

  priorityColor(currentTask){
    if (currentTask.priority === 3){
      return "bg-danger";
    } else if (currentTask.priority === 2) {
      return "bg-warning";
    } else {
      return "bg-info";
    }
  }
  toggleDone(clickedTask: Task, setCompleteness: boolean) {
    clickedTask.done = setCompleteness;
  }

  isDone(currentTask) {
    if (currentTask.done === true) {
      currentTask.done = false;
    } else {
      currentTask.done = true;
    }
  }
}
