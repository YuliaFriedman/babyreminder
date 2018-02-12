import {Injectable} from "@angular/core";
import {AppFeatureSupportService} from "./appFeaturesSuppertService";
import {cordova} from "../globalDeclarations";
import {EventsManager, IEventHandler} from "./AppEventsManager";
import {AppConstants} from "../appConstants";

@Injectable()
export class BackgroundManager implements IEventHandler{

  constructor(private appFeatureSupportService: AppFeatureSupportService, private eventsManager:EventsManager){

      if(appFeatureSupportService.hasBackgroundService()){
        window.cordova.plugins.backgroundMode.on('activate', function () {
          window.cordova.plugins.backgroundMode.disableWebViewOptimizations();
        });
        window.cordova.plugins.backgroundMode.overrideBackButton();
        window.cordova.plugins.backgroundMode.enable();

        eventsManager.subscribeEvent(AppConstants.eventTypes.wakeAppEvent, this);
      }
  }

  handleEvent(eventType: string, data: any) {
    if(eventType == AppConstants.eventTypes.wakeAppEvent){

      window.cordova.plugins.lockInfo.isLocked(
        (isLocked) => {
            if(isLocked){
              // if ("Notification" in window) {
              //   Notification.requestPermission(function (permission) {
              //     // If the user accepts, let’s create a notification
              //     if (permission === "granted") {
              //       var notification = new Notification("My title", {
              //         tag: "message1",
              //         body: "My body"
              //       });
              //       notification.onshow  = function() { console.log("show"); };
              //       notification.onclose = function() { console.log("close"); };
              //       notification.onclick = function() { console.log("click"); };
              //     }
              //   });
              // }

              window.cordova.plugins.notification.local.schedule({
                title: 'My first notification',
                text: 'Thats pretty easy...',
                foreground: true
              });
            }
            else{
              window.cordova.plugins.backgroundMode.moveToForeground();
            }
        },
        () => {

        }
      );


    }
  }

}
