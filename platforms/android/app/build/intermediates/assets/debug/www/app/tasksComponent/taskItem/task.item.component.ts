import {Component, Input} from '@angular/core';
import {Task} from "../../models/task";
import {AppUtils} from "../../services/AppUtils";

@Component({
  selector: 'task-item',
  templateUrl: './task.item.component.html',
  styleUrls: ['./task.item.component.scss']
})

export class TaskItemComponent {

  @Input() task: Task;
  appUtils: AppUtils;

  constructor(appUtils: AppUtils){
    this.appUtils = appUtils;
  }

  enableValueChanged(task): void{
    task.isEnabled = !task.isEnabled;
  }

}
