import {Observable} from "rxjs/Observable";
import {Contact, Task} from "../models/task";
import {tasks} from "../api/tasks";
import {AppFeatureSupportService} from "./appFeaturesSuppertService";
import {ErrorType, Error} from "../models/errors";
import {Injectable} from "@angular/core";
import {LogService} from "./LogService";

@Injectable()
export class DataProvider{

  newTask: Task;

  constructor(private _appFeatureSupportService: AppFeatureSupportService, private _logService: LogService){

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
        var options = {
          multiple:true
        }
        //options.multiple = true;
        var fields = ["displayName","phoneNumbers"];
        navigator.contacts.find(fields, result => {

          let contacts;

          if(result){
            contacts = [];
            for(let contact of result){
              let name = contact.displayName;
              let phone = contact.phoneNumbers && contact.phoneNumbers.length > 0 ? contact.phoneNumbers[0] : "";
              contacts.push(new Contact(name, phone));
            }
          }
          this._logService.log("Contacts: ", contacts);
          observer.next(contacts);
          observer.complete();
        }, () => {
          this._logService.log("Get contacts failed");
          observer.error(new Error("Get contacts failed", ErrorType.GetContactsFailed));
        }, options);
      }
      else{
        let c1 = new Contact("aaa", "222");
        let c2 = new Contact("bbb", "333");
        observer.next([c1, c2]);
        observer.complete();
      }
    });

    // let contacts = [];
    // contacts.push(new Contact("Danny", "05455555555"));
    // contacts.push(new Contact("Mom", "05455555555"));
    // return contacts;
  }
}
