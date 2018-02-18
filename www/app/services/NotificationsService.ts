import {Injectable} from "@angular/core";
import {EventsManager, IEventHandler} from "./AppEventsManager";
import {AppFeatureSupportService} from "./appFeaturesSuppertService";
import {AppConstants} from "../appConstants";
import {ActionGroups, CustomNotificationData, NewNotification, NotificationType} from "../models/notificationInfo";
import {Task} from "../models/task";

@Injectable()
export class NotificationsService implements IEventHandler{

  constructor(private appFeatureSupportService: AppFeatureSupportService, private eventsManager:EventsManager){
    if(appFeatureSupportService.hasLocalNotifications()) {
      window.cordova.plugins.notification.local.hasPermission((granted) => {
        if(granted){
          this.init();
        }
        else{
          window.cordova.plugins.notification.local.requestPermission((granted) => {
            if(granted){
              this.init();
            }
          });
        }
      });

    }
  }

  init(){
    this.eventsManager.subscribeEvent(AppConstants.eventTypes.notification, this);

    // window.cordova.plugins.notification.local.addActionGroup(ActionGroups.TaskCompletedAlert, [
    //   {id: 'skip', title: 'Skip'},
    //   {id: 'snooze', title: 'Snooze'},
    //   {id: 'done', title: 'Done'}
    // ]);

    // window.cordova.plugins.notification.local.on('skip', (notification, eopts) => {
    //   console.log("Notification skip clicked - id = " + notification.data.id + " - task - " + notification.text);
    // });
    //
    // window.cordova.plugins.notification.local.on('snooze', (notification, eopts) => {
    //   console.log("Notification snooze clicked - id = " + notification.data.id + " - task - " + notification.text);
    // });
    //
    // window.cordova.plugins.notification.local.on('done', (notification, eopts) => {
    //   console.log("Notification done clicked - id = " + notification.data.id + " - task - " + notification.text);
    // });
  }

  handleEvent(eventType: string, data: NewNotification) {
    if(eventType == AppConstants.eventTypes.notification){
      let notification = this.createNotificationData(data);
      console.log("Scheduling notification", notification);
      window.cordova.plugins.notification.local.schedule(notification);
    }
  }

  createNotificationData(notification:NewNotification){
    let notificationData:any = {};
    notificationData.foreground = true;


    switch (notification.type){
      case NotificationType.TaskCompletedAlert:
        let task:Task = notification.data;
        notificationData.text = task.title;
        //notificationData.id = task.id;
        //notificationData.actionGroupId = ActionGroups.TaskCompletedAlert;
        notificationData.title = "Task completed?";
        notificationData.icon="https://image.ibb.co/fvS6Ln/baby_icon.png";
        notificationData.smallIcon="https://image.ibb.co/bys1mS/alarm_icon.png";
        // notificationData.actions = [
        //   {id: 'skip', title: 'Skip'},
        //   {id: 'snooze', title: 'Snooze'},
        //   {id: 'done', title: 'Done'}
        // ];
        notificationData.data = task;
        break;
      case NotificationType.Custom:
        let customData:CustomNotificationData = notification.data;
        notificationData.text = customData.title;
        notificationData.id = customData.id;
        notificationData.title = customData.title;
        if(customData.actionGroupId){
          notificationData.actionGroupId = customData.actionGroupId;
        }
        else if(customData.actions){
          notificationData.actions = customData.actions;
        }
        break;
    }
    return notificationData;
  }

}
