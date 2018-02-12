import {Component} from '@angular/core';
import {EventsManager, IEventHandler} from "../../services/AppEventsManager";
import {AppConstants} from "../../appConstants";
import {Task} from "../../models/task";

@Component({
  selector: 'task-alert',
  templateUrl: './task.alert.component.html',
  styleUrls: ['./task.alert.component.scss']
})
export class TaskAlertComponent implements IEventHandler{


  currentTask: Task;
  showAlert:boolean = false;
  alertsQueue: Task[] = [];

  constructor(private eventsManager:EventsManager){
    eventsManager.subscribeEvent(AppConstants.eventTypes.wakeAppEvent, this);
  }

  handleEvent(eventType: string, data: any) {
    if(eventType == AppConstants.eventTypes.wakeAppEvent){
      this.addAlertToQueue(data);
      this.handleQueue();
    }
  }

  addAlertToQueue(task:Task){
    if(this.hasTaskWithId(task.id)){
      return;
    }
    this.alertsQueue.push(task);
  }

  hasTaskWithId(id){
    for(let task of this.alertsQueue){
      if(task.id == id){
        true;
      }
    }
    return false;
  }

  handleQueue(){
    if(this.showAlert || this.alertsQueue.length == 0){
      return;
    }

    this.currentTask = this.alertsQueue[0];
    this.alertsQueue.splice(0, 1);
    this.showAlert = true;
  }

  hideAlert(){
    this.showAlert = false;
    this.handleQueue();
  }

  snoozeTask(){
    this.showAlert = false;
    this.handleQueue();
  }

  completeTask(){
    this.showAlert = false;
    this.handleQueue();
  }
}
