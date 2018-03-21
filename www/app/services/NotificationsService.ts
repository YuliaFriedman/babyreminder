import {Injectable} from "@angular/core";
import {EventsManager, IEventHandler} from "./AppEventsManager";
import {AppFeatureSupportService} from "./appFeaturesSuppertService";
import {AppConstants} from "../appConstants";
import {ActionGroups, CustomNotificationData, NewNotification, NotificationType} from "../models/notificationInfo";
import {Task} from "../models/task";
import {DataProvider} from "./DataProvider";

@Injectable()
export class NotificationsService implements IEventHandler{
  handlerName: string;
  localNotification;

  constructor(private appFeatureSupportService: AppFeatureSupportService, private eventsManager:EventsManager, private dataProvider:DataProvider){
    this.handlerName = "NotificationsService";

    if(appFeatureSupportService.hasNavigatorNotification()) {
      this.init();
    }


    // if(appFeatureSupportService.hasLocalNotifications()) {
    //   appFeatureSupportService.localNotificationHasPermission((granted) => {
    //     if(granted){
    //       this.init();
    //     }
    //     else{
    //       appFeatureSupportService.requestPermissionForLocalNotifications((granted) => {
    //         if(granted){
    //           this.init();
    //         }
    //       });
    //     }
    //   });
    // }
  }

  init(){
    this.localNotification = this.appFeatureSupportService.getLocalNotification();
    this.eventsManager.subscribeEvent(AppConstants.eventTypes.notification, this);

    // window.cordova.plugins.notification.local.addActionGroup(ActionGroups.TaskCompletedAlert, [
    //   {id: 'skip', title: 'Skip'},
    //   {id: 'snooze', title: 'Snooze'},
    //   {id: 'done', title: 'Done'}
    // ]);

    this.localNotification.on('skip', (notification, eopts) => {
      alert("Notification skip clicked - id = " + notification.data.id + " - task - " + notification.text);
    });

    this.localNotification.on('snooze', (notification, eopts) => {
      alert("Notification snooze clicked - id = " + notification.data.id + " - task - " + notification.text);
    });

    this.localNotification.on('done', (notification, eopts) => {
      alert("Notification done clicked - id = " + notification.data.id + " - task - " + notification.text);
    });
  }

  handleEvent(eventType: string, data: NewNotification) {
    if(eventType == AppConstants.eventTypes.notification){
      let notification = this.createNotificationData(data);
      console.log("Scheduling notification", notification);
      this.localNotification.schedule(notification);
      navigator.notification.beep(3);
      navigator.vibrate(2000);
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
        if(this.dataProvider.platform == "Android"){
          notificationData.sound = "file:///android_asset/www/assets/notification_sound.mp3";
        }
        notificationData.actions = [
          {id: 'skip', title: 'Skip'},
          {id: 'snooze', title: 'Snooze'},
          {id: 'done', title: 'Done'}
        ];
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
