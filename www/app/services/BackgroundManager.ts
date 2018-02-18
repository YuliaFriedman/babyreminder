import {Injectable} from "@angular/core";
import {AppFeatureSupportService} from "./appFeaturesSuppertService";
import {cordova} from "../globalDeclarations";
import {EventsManager, IEventHandler} from "./AppEventsManager";
import {AppConstants} from "../appConstants";
import {ActionGroups, NewNotification, NotificationType} from "../models/notificationInfo";
import {Task} from "../models/task";

@Injectable()
export class BackgroundManager implements IEventHandler {

  constructor(private appFeatureSupportService: AppFeatureSupportService, private eventsManager: EventsManager) {

    if (appFeatureSupportService.hasBackgroundService()) {
      window.cordova.plugins.backgroundMode.on('activate', function () {
        window.cordova.plugins.backgroundMode.disableWebViewOptimizations();
      });
      window.cordova.plugins.backgroundMode.overrideBackButton();
      window.cordova.plugins.backgroundMode.enable();

      eventsManager.subscribeEvent(AppConstants.eventTypes.wakeupEvent, this);
    }
  }

  handleEvent(eventType: string, data: any) {
    if (eventType == AppConstants.eventTypes.wakeupEvent) {

      window.cordova.plugins.lockInfo.isLocked(
        (isLocked) => {

          let notification = new NewNotification();
          notification.type = NotificationType.TaskCompletedAlert;
          notification.data = data;

          if (isLocked) {
            this.eventsManager.handleEvent(AppConstants.eventTypes.notification, notification);
          }
          window.cordova.plugins.backgroundMode.moveToForeground();
          this.eventsManager.handleEvent(AppConstants.eventTypes.alert, notification);
        },
        () => {

        }
      );


    }
  }

}
