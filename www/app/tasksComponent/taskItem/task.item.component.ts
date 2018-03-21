import {Component, Input} from '@angular/core';
import {Task} from "../../models/task";
import {AppUtils} from "../../services/AppUtils";
import {TaskChangedData, TaskChangeStatus} from "../../models/taskChangedModel";
import {AppConstants} from "../../appConstants";
import {EventsManager} from "../../services/AppEventsManager";

@Component({
  selector: 'task-item',
  templateUrl: './task.item.component.html',
  styleUrls: ['./task.item.component.scss']
})

export class TaskItemComponent {

  @Input() task: Task;
  appUtils: AppUtils;

  constructor(appUtils: AppUtils, private eventsManager:EventsManager){
    this.appUtils = appUtils;
  }

  enableValueChanged(task, event): void{
    if(task.isEnabled){
      this.eventsManager.handleEvent(AppConstants.eventTypes.taskStatusChanged, new TaskChangedData(task, TaskChangeStatus.Stop));
    }
    else{
      this.eventsManager.handleEvent(AppConstants.eventTypes.taskStatusChanged, new TaskChangedData(task, TaskChangeStatus.Start));
    }
  }

}
