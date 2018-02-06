import {Injectable} from "@angular/core";

declare global {
  interface Navigator {
    contacts: any;
  }
}

@Injectable()
export class AppFeatureSupportService{

  constructor(){

  }

  hasContacts(): boolean{
    let hasContacts = navigator && navigator.contacts;
    console.log("has contacts = " + hasContacts);
    return hasContacts;
  }

}
