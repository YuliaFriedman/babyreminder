import {Observable} from "rxjs/Observable";
import {Contact, Task, TimerType} from "../models/task";
import {tasks} from "../api/tasks";
import {AppFeatureSupportService} from "./appFeaturesSuppertService";
import {ErrorType, Error} from "../models/errors";
import {Injectable, NgZone} from "@angular/core";
import {LogService} from "./LogService";
import {TasksTimer} from "./TasksTimerService";
import {AppConstants} from "../appConstants";
import {EventsManager, IEventHandler} from "./AppEventsManager";
import {NewNotification, NotificationType} from "../models/notificationInfo";
import {TaskChangedData, TaskChangeStatus} from "../models/taskChangedModel";
import {IMessage, MessageType, TaskStatusChangedMessage} from "../models/message";
//import {setTimeout} from "timers";

@Injectable()
export class DataProvider implements IEventHandler{
  handlerName: string;

  platform: "Android";

  tasks;
  newTask: Task;

  constructor(private _appFeatureSupportService: AppFeatureSupportService, private zone:NgZone,
              private eventsManager:EventsManager){
    this.handlerName = "DataProvider";
      eventsManager.subscribeEvent(AppConstants.eventTypes.taskStatusChanged, this);
  }

  handleEvent(eventType: string, data: any) {
    switch (eventType){
      // TODO: notify server!!!
      case AppConstants.eventTypes.taskStatusChanged:
        let taskData = data as TaskChangedData;
        switch (taskData.status){
          case TaskChangeStatus.Stop:
            taskData.task.stopTask();
            break;
          case TaskChangeStatus.Snooze:
            taskData.task.snoozeTask();
            break;
          case TaskChangeStatus.Complete:
            taskData.task.completeTask();
            break;
          case TaskChangeStatus.Start:
            taskData.task.startTimer();
            break;
        }
        this.eventsManager.handleEvent(AppConstants.eventTypes.setAlarm, this.tasks);
        break;
    }
  }

  getMessages(): Observable<IMessage[]>{

    let messages = [];
    let m1 = new TaskStatusChangedMessage();
    m1.title = "Take kid to the kinder garden";
    m1.date = new Date().getTime();
    m1.executor = new Contact("Danny", "0546666666");
    m1.type = MessageType.TaskCompleted;
    m1.status = TaskChangeStatus.Complete;

    let m2 = new TaskStatusChangedMessage();
    m2.title = "Take kid to the kinder garden 222";
    m2.date = new Date().getTime();
    m2.executor = new Contact("Danny", "0546666666");
    m2.type = MessageType.TaskCanceled;
    m2.status = TaskChangeStatus.Stop;

    return new Observable((observer) => {
      observer.next([m1 , m2]);
      observer.complete();
    });
  }

  getTasks():  Observable<Task[]>{
    return new Observable((observer) => {
      if(!this.tasks){
        this.tasks = tasks;
        // TODO: remove
        //this.eventsManager.handleEvent(AppConstants.eventTypes.setAlarm, tasks);
        // let notification = new NewNotification();
        // notification.type = NotificationType.TaskCompletedAlert;
        // notification.data = tasks[0];
        // this.eventsManager.handleEvent(AppConstants.eventTypes.alert, notification);
      }
      observer.next(this.tasks);
      observer.complete();
    });
  }

  getTaskById(id:string): Observable<Task> {

    return new Observable((observer) => {
      if (this.tasks) {
        for (let task of this.tasks) {
          if (task.id == id) {
            observer.next(task);
            observer.complete();
          }
        }
        observer.next(null);
        observer.complete();
      }
      else {
        let sub = this.getTasks().subscribe(tasks => {
          sub.unsubscribe();
          for (let task of this.tasks) {
            if (task.id == id) {
              observer.next(task);
              observer.complete();
            }
          }
          observer.next(null);
          observer.complete();
        });
      }
    });
  }


  saveNewTask(task:Task): Promise<void>{
    // save in server
    const promise = new Promise<void>((resolve, reject) => {
      this.tasks.push(task);
      this.newTask = null;
      task.timerState.setType(TimerType.Alarm);
      //this.tasksTimer.setAlarms(this.tasks);
      this.eventsManager.handleEvent(AppConstants.eventTypes.setAlarm, this.tasks);
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

  deleteTask(task){
    let indexOfTask = this.tasks.indexOf(task);
    if(indexOfTask >= 0) {
      this.tasks.splice(indexOfTask, 1);
    }
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

      this.zone.run(() => {
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
        LogService.log("Contacts: ", contacts);
        this.markSelectedContacts(contacts);
        observer.next(contacts);
        observer.complete();
      });

    }, () => {
      LogService.log("Get contacts failed");
      observer.error(new Error("Get contacts failed", ErrorType.GetContactsFailed));
    }, options);
  }

  getDemoContacts(observer){
    let arr = [new Contact("aaa", "222"),
      new Contact("bbb", "111"),
      new Contact("aaa", "222"),
      new Contact("ccc", "333"),
      new Contact("vvv", "444"),
      new Contact("bbb", "555"),
      new Contact("nnn", "666"),
      new Contact("mmm", "777"),
      new Contact("fff", "888"),

      new Contact("ggg", "222111"),
      new Contact("hhh", "333222"),
      new Contact("jjj", "222333"),
      new Contact("kkk", "333444"),
      new Contact("lll", "222555"),
      new Contact("qqq", "333666"),
      new Contact("www", "222777"),
      new Contact("eee", "333888"),
      new Contact("rrr", "222999"),

      new Contact("ttt", "222222111"),
      new Contact("yyy", "333333222"),
      new Contact("uuu", "222444333"),
      new Contact("iii", "333555444"),
      new Contact("ooo", "222666555"),
      new Contact("ppp", "333777666"),
      new Contact("zzz", "222888777"),
      new Contact("xxx", "333888888")];

    //this.markSelectedContacts(arr);

    setTimeout(() => {
      observer.next(arr);
      observer.complete();
    }, 50000);
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

}
