import {Injectable} from "@angular/core";
import {AppUtils} from "./AppUtils";
import {cordova} from "../globalDeclarations";

@Injectable()
export class AppFeatureSupportService{

  constructor(private appUtils:AppUtils){

  }

  hasContacts(): boolean{
    let hasContacts = !this.appUtils.nullOrUndefined(navigator) && !this.appUtils.nullOrUndefined(navigator.contacts);
    console.log("has contacts = " + hasContacts);
    return hasContacts;
  }

  hasWakeupTimer(): boolean{
    let hasWakeup = !this.appUtils.nullOrUndefined(window.wakeuptimer);
    console.log("has wakeup timer = " + hasWakeup);
    return hasWakeup;
  }

  hasBackgroundService(): boolean{
    let hasBackgroundService = !this.appUtils.nullOrUndefined(window.cordova) && !this.appUtils.nullOrUndefined(window.cordova.plugins) && !this.appUtils.nullOrUndefined(window.cordova.plugins.backgroundMode);
    console.log("has background service = " + hasBackgroundService);
    return hasBackgroundService;
  }

  hasLocalNotifications(): boolean{
    let hasLocalNotifications = !this.appUtils.nullOrUndefined(window.cordova) && !this.appUtils.nullOrUndefined(window.cordova.plugins) && !this.appUtils.nullOrUndefined(window.cordova.plugins.notification) && !this.appUtils.nullOrUndefined(window.cordova.plugins.notification.local);
    console.log("has local notifications = " + hasLocalNotifications);
    return hasLocalNotifications;
  }

  hasLockInfo(): boolean{
    let hasLockInfo = !this.appUtils.nullOrUndefined(window.cordova) && !this.appUtils.nullOrUndefined(window.cordova.plugins) && !this.appUtils.nullOrUndefined(window.cordova.plugins.lockInfo);
    console.log("has lock info = " + hasLockInfo);
    return hasLockInfo;
  }
}
