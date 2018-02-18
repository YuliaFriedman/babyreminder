import {Component} from '@angular/core';
import {EventsManager, IEventHandler} from "../../services/AppEventsManager";
import {AppConstants} from "../../appConstants";
import {Task} from "../../models/task";
import {NewNotification} from "../../models/notificationInfo";
import {DataProvider} from "../../services/DataProvider";

@Component({
  selector: 'task-alert',
  templateUrl: './task.alert.component.html',
  styleUrls: ['./task.alert.component.scss']
})
export class TaskAlertComponent implements IEventHandler{


  currentTask: Task;
  showAlert:boolean = false;
  alertsQueue: Task[] = [];

  constructor(private eventsManager:EventsManager, private dataProvider:DataProvider){
    eventsManager.subscribeEvent(AppConstants.eventTypes.alert, this);
  }

  handleEvent(eventType: string, data: any) {
    if(eventType == AppConstants.eventTypes.alert){
      this.addAlertToQueue(data);
      this.handleQueue();
    }
  }

  addAlertToQueue(notification:NewNotification){
    if(this.hasTaskWithId(notification.data.id)){
      return;
    }
    this.alertsQueue.push(notification.data);
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

  stopAlert(){
    this.showAlert = false;
    this.currentTask.stopTask();
    this.raiseResetAlarm();
    this.handleQueue();
  }

  snoozeTask(){
    this.showAlert = false;
    this.currentTask.snoozeTask();
    this.raiseResetAlarm();
    this.handleQueue();
  }

  completeTask(){
    this.showAlert = false;
    this.currentTask.completeTask();
    this.raiseResetAlarm();
    this.handleQueue();
  }

  raiseResetAlarm(){
    this.dataProvider.getTasks().subscribe(
      tasks => {
        this.eventsManager.handleEvent(AppConstants.eventTypes.setAlarm, tasks);
      }
    );

  }
}
