import {Component} from '@angular/core';
import {EventsManager, IEventHandler} from "../../services/AppEventsManager";
import {AppConstants} from "../../appConstants";
import {Task} from "../../models/task";
import {NewNotification, NotificationType} from "../../models/notificationInfo";
import {DataProvider} from "../../services/DataProvider";
import {TaskChangedData, TaskChangeStatus} from "../../models/taskChangedModel";
import {LogService} from "../../services/LogService";

@Component({
  selector: 'task-alert',
  templateUrl: './task.alert.component.html',
  styleUrls: ['./task.alert.component.scss']
})
export class TaskAlertComponent implements IEventHandler{

  handlerName: string;


  currentNotification: NewNotification;

  viewData = {
    title: "",
    content: "",
    titleIconClass: "",
    buttons: []
  };

  showAlert:boolean = false;
  alertsQueue: NewNotification[] = [];

  constructor(private eventsManager:EventsManager, private dataProvider:DataProvider){
    this.handlerName = "TaskAlertComponent";
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
      LogService.log("Alert NOT added to queue, already in queue: ", notification);
      return;
    }

    LogService.log("Adding alert event to queue: ", notification);
    this.alertsQueue.push(notification);
  }

  hasTaskWithId(id){
    for(let notification of this.alertsQueue){
      if(notification.data.id == id){
        true;
      }
    }
    return false;
  }

  handleQueue(){
    if(this.showAlert || this.alertsQueue.length == 0){
      LogService.log("In handle queue - alerts, not showing new alert [alert is shown = " + this.showAlert + ", # of alerts = " + this.alertsQueue.length);
      return;
    }

    this.currentNotification = this.alertsQueue[0];

    LogService.log("Next alert to show: ", this.currentNotification);

    switch (this.currentNotification.type){
      case NotificationType.TaskCompletedAlert:
        this.viewData.title = "Task completed?";
        this.viewData.content = this.currentNotification.data.title;
        this.viewData.titleIconClass = "task_alert_icon";
        this.viewData.buttons = [
          {
            class: "stop_button",
            callback: () => this.stopAlert()
          },
          {
            class: "snooze_button",
            callback: () => this.snoozeTask()
          },
          {
            class: "done_button",
            callback: () => this.completeTask()
          }
        ];
        break;
      case NotificationType.Custom:
        // TODO: complete this!!
        break;
    }

    this.alertsQueue.splice(0, 1);
    this.showAlert = true;

    LogService.log("Next alert view data: ", this.viewData);

  }

  stopAlert(){
    this.showAlert = false;
    this.eventsManager.handleEvent(AppConstants.eventTypes.taskStatusChanged, new TaskChangedData(this.currentNotification.data, TaskChangeStatus.Stop));
    this.handleQueue();
  }

  snoozeTask(){
    this.showAlert = false;
    this.eventsManager.handleEvent(AppConstants.eventTypes.taskStatusChanged, new TaskChangedData(this.currentNotification.data, TaskChangeStatus.Snooze));
    this.handleQueue();
  }

  completeTask(){
    this.showAlert = false;
    this.eventsManager.handleEvent(AppConstants.eventTypes.taskStatusChanged, new TaskChangedData(this.currentNotification.data, TaskChangeStatus.Complete));
    this.handleQueue();
  }

}
