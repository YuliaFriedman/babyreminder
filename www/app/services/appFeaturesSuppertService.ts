import {Injectable} from "@angular/core";
import {AppUtils} from "./AppUtils";

declare global {
  interface Navigator {
    contacts: any;
  }
}

declare global {
  interface Window {
    wakeuptimer: any;
  }
}

@Injectable()
export class AppFeatureSupportService{

  constructor(private appUtils:AppUtils){

  }

  hasContacts(): boolean{
    let hasContacts = !this.appUtils.nullOrUndefined(navigator && navigator.contacts);
    console.log("has contacts = " + hasContacts);
    return hasContacts;
  }

  hasWakeupTimer(): boolean{
    let hasWakeup = !this.appUtils.nullOrUndefined(window.wakeuptimer);
    console.log("has wakeup timer = " + hasWakeup);
    return hasWakeup;
  }

}
