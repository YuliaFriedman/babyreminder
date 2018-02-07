import {Observable} from "rxjs/Observable";
import {Contact, Task} from "../models/task";
import {tasks} from "../api/tasks";
import {AppFeatureSupportService} from "./appFeaturesSuppertService";
import {ErrorType, Error} from "../models/errors";
import {Injectable, NgZone} from "@angular/core";
import {LogService} from "./LogService";
//import {setTimeout} from "timers";

@Injectable()
export class DataProvider{

  newTask: Task;

  constructor(private _appFeatureSupportService: AppFeatureSupportService, private _logService: LogService, private zone:NgZone){

  }

  getTasks():  Observable<Task[]>{
    return new Observable((observer) => {
      observer.next(tasks);
      observer.complete();
    });
  }


  saveNewTask(task:Task): Promise<void>{
    const promise = new Promise<void>((resolve, reject) => {
      tasks.push(task);
      this.newTask = null;
      resolve();
    });
    return promise;
  }

  getNewTask(){
    if(!this.newTask){
      this.newTask = new Task();
    }
    return this.newTask;
  }

  getContacts(): Observable<Contact[]>{
    return new Observable((observer) => {

      if(this._appFeatureSupportService.hasContacts()){
        //var options = new ContactFindOptions();
        this.getRealContacts(observer);
      }
      else{
        this.getDemoContacts(observer);
      }
    });

    // let contacts = [];
    // contacts.push(new Contact("Danny", "05455555555"));
    // contacts.push(new Contact("Mom", "05455555555"));
    // return contacts;
  }

  getRealContacts(observer){
    var options = {
      multiple:true
    }
    //options.multiple = true;
    var fields = ["displayName","phoneNumbers"];
    navigator.contacts.find(fields, result => {

      //this.zone.run(() => {
      let contacts;

      if(result){
        contacts = [];
        for(let contact of result){

          let hasPhone = contact.phoneNumbers && contact.phoneNumbers.length > 0;
          if(hasPhone){
            let phone = contact.phoneNumbers[0].value;
            let name = contact.displayName;
            contacts.push(new Contact(name, phone));
          }

        }
      }
      this._logService.log("Contacts: ", contacts);
      this.markSelectedContacts(contacts);
      observer.next(contacts);
      observer.complete();
      //});

    }, () => {
      this._logService.log("Get contacts failed");
      observer.error(new Error("Get contacts failed", ErrorType.GetContactsFailed));
    }, options);
  }

  getDemoContacts(observer){
    let arr = [new Contact("aaa", "222"),
      new Contact("bbb", "333"),
      new Contact("aaa", "222"),
      new Contact("bbb", "333"),
      new Contact("aaa", "222"),
      new Contact("bbb", "333"),
      new Contact("aaa", "222"),
      new Contact("bbb", "333"),
      new Contact("aaa", "222"),

      new Contact("aaa", "222"),
      new Contact("bbb", "333"),
      new Contact("aaa", "222"),
      new Contact("bbb", "333"),
      new Contact("aaa", "222"),
      new Contact("bbb", "333"),
      new Contact("aaa", "222"),
      new Contact("bbb", "333"),
      new Contact("aaa", "222"),

      new Contact("aaa", "222"),
      new Contact("bbb", "333"),
      new Contact("aaa", "222"),
      new Contact("bbb", "333"),
      new Contact("aaa", "222"),
      new Contact("bbb", "333"),
      new Contact("aaa", "222"),
      new Contact("bbb", "333"),
      new Contact("aaa", "222")];

    this.markSelectedContacts(arr);

    //setTimeout(() => {
      observer.next(arr);
      observer.complete();
    //}, 1000);
  }

  markSelectedContacts(contacts){
    if(this.newTask && this.newTask.contacts){
      for(let newC of this.newTask.contacts){
        let found = false;
        for(let c of contacts){
          if(newC.equal(c)){
            c.isSelected = true;
            found = true;
            break;
          }
        }
        if(!found){
          contacts.splice(0, 0, newC);
        }
      }
    }
  }

  setContactsInNewTask(contacts: Contact[]): void{
    if(this.newTask){
      this.newTask.contacts = contacts;
    }
  }
}
