import {Component} from '@angular/core';
import {EventsManager, IEventHandler} from "../../services/AppEventsManager";
import {AppConstants} from "../../appConstants";
import {Task} from "../../models/task";
import {NewNotification, NotificationType} from "../../models/notificationInfo";
import {DataProvider} from "../../services/DataProvider";

@Component({
  selector: 'task-alert',
  templateUrl: './task.alert.component.html',
  styleUrls: ['./task.alert.component.scss']
})
export class TaskAlertComponent implements IEventHandler{


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
      return;
    }

    this.currentNotification = this.alertsQueue[0];

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
  }

  stopAlert(){
    this.showAlert = false;
    this.currentNotification.data.stopTask();
    this.raiseResetAlarm();
    this.handleQueue();
  }

  snoozeTask(){
    this.showAlert = false;
    this.currentNotification.data.snoozeTask();
    this.raiseResetAlarm();
    this.handleQueue();
  }

  completeTask(){
    this.showAlert = false;
    this.currentNotification.data.completeTask();
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

  test(data){
    console.log(data);
  }
}
