import {Injectable} from "@angular/core";
import {AppUtils} from "./AppUtils";
import {cordova} from "../globalDeclarations";
import {LogService} from "./LogService";

@Injectable()
export class AppFeatureSupportService{

  constructor(private appUtils:AppUtils){

  }

  hasContacts(): boolean{
    let hasContacts = !this.appUtils.nullOrUndefined(navigator) && !this.appUtils.nullOrUndefined(navigator.contacts);
    LogService.log("has contacts feature = " + hasContacts);
    return hasContacts;
  }

  hasWakeupTimer(): boolean{
    let hasWakeup = !this.appUtils.nullOrUndefined(window.wakeuptimer);
    LogService.log("has wakeup timer feature = " + hasWakeup);
    return hasWakeup;
  }

  hasBackgroundService(): boolean{
    let hasBackgroundService = !this.appUtils.nullOrUndefined(window.cordova) && !this.appUtils.nullOrUndefined(window.cordova.plugins) && !this.appUtils.nullOrUndefined(window.cordova.plugins.backgroundMode);
    LogService.log("has background service feature = " + hasBackgroundService);
    return hasBackgroundService;
  }

  /* LOCAL NOTIFICATIONS */

  hasLocalNotifications(): boolean{
    let hasLocalNotifications = !this.appUtils.nullOrUndefined(window.cordova) && !this.appUtils.nullOrUndefined(window.cordova.plugins) && !this.appUtils.nullOrUndefined(window.cordova.plugins.notification) && !this.appUtils.nullOrUndefined(window.cordova.plugins.notification.local);
    LogService.log("has local notifications feature = " + hasLocalNotifications);
    return hasLocalNotifications;
  }

  localNotificationHasPermission(callback){
    window.cordova.plugins.notification.local.hasPermission((granted) => {
      if(callback){
        callback(granted);
      }
    });
  }

  getLocalNotification(){
    return window.cordova.plugins.notification.local;
  }

  requestPermissionForLocalNotifications(callback){
    window.cordova.plugins.notification.local.requestPermission((granted) => {
      if(callback){
        callback(granted);
      }
    });
  }

  hasNavigatorNotification(): boolean{
    let hasNotifications = !this.appUtils.nullOrUndefined(window.navigator) && !this.appUtils.nullOrUndefined(window.navigator.notification) && !this.appUtils.nullOrUndefined(window.navigator.notification);
    LogService.log("has navigator notifications feature = " + hasNotifications);
    return hasNotifications;
  }

  hasLockInfo(): boolean{
    let hasLockInfo = !this.appUtils.nullOrUndefined(window.cordova) && !this.appUtils.nullOrUndefined(window.cordova.plugins) && !this.appUtils.nullOrUndefined(window.cordova.plugins.lockInfo);
    console.log("has lock info feature = " + hasLockInfo);
    return hasLockInfo;
  }
}
