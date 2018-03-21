import {Injectable} from "@angular/core";
import {LogService} from "../services/LogService";

let idIndex = 0;
let id = 0;

let snoozeMinutes = 10;
let hour = 600000 * 10;

export class Task {
  id: string;
  title: string;
  days: Days[];
  time: Time;
  isEnabled: boolean;
  repeat: boolean;
  contacts: Contact[];
  timerState:TimerState;
  completedDays: Days[];

  constructor(){
    this.id = id + "";
    id++;
    let now = new Date();
    this.time = new Time(now.getHours(), now.getMinutes());
    this.isEnabled = true;
    this.days = [];
    this.contacts = [];
    this.timerState = new TimerState();
    this.repeat = false;
    this.completedDays = [];
  }

  copy(task:Task){
    this.id = task.id;
    this.title = task.title;
    this.days = task.days.map(x => x);
    this.time.hour = task.time.hour;
    this.time.minute = task.time.minute;
    this.isEnabled = task.isEnabled;
    this.repeat = task.repeat;
    this.contacts = task.contacts.map(x => new Contact(x.name,x.phone));
    this.timerState = Object.assign(this.timerState, task.timerState);
    this.completedDays = task.completedDays.map(x => x);
  }

  snoozeTask(){
    this.timerState.setType(TimerType.Snooze);
    this.timerState.addSnooze(this.time);

    LogService.log("In snooze task: ", this);
  }

  stopTask(){
    this.isEnabled = false;
    this.timerState.setType(TimerType.Idle);

    LogService.log("In stop task: ", this);
  }

  completeTask(){

    LogService.log("In complete task: ", this);

    if(!this.repeat){
      let today = new Date().getDay();
      if(!this.completedDays.includes(today)){
        this.completedDays.push(today);
      }
    }
    let CompletedAll = this.days.length == this.completedDays.length;
    if(CompletedAll){
      this.timerState.setType(TimerType.Idle);
      this.isEnabled = false;
    }
    else{
      this.timerState.setType(TimerType.Alarm);
    }

    LogService.log("In complete task: all days completed = " + CompletedAll, this);
  }

  startTimer(){
    if(this.timerState.type == TimerType.Alarm || this.timerState.type == TimerType.Snooze){
      return;
    }
    this.timerState.setType(TimerType.Alarm);
    this.isEnabled = true;
  }

  getNotCompletedDays(){
    let result = [];
    for(let day of this.days){
      if(this.completedDays.indexOf(day) < 0){
        result.push(day);
      }
    }
    return result;
  }

  getNextAlarmDay(){
    return "";
  }

  sortDays(){
    this.days.sort((a, b) => a - b);
  }

}

export enum Days {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}

export let DaysHelper = {
  getPrefixOfDayName: function (day: Days, prefixLength: number) {
    switch (day){
      case Days.Sunday:
        return 'Sunday'.substr(0, prefixLength);
      case Days.Monday:
        return 'Monday'.substr(0, prefixLength);
      case Days.Tuesday:
        return 'Tuesday'.substr(0, prefixLength);
      case Days.Wednesday:
        return 'Wednesday'.substr(0, prefixLength);
      case Days.Thursday:
        return 'Thursday'.substr(0, prefixLength);
      case Days.Friday:
        return 'Friday'.substr(0, prefixLength);
      case Days.Saturday:
        return 'Saturday'.substr(0, prefixLength);
    }
  }
};

export class Contact{
  name: string;
  phone: string;
  isSelected: boolean;
  isNew: boolean;

  constructor(name: string, phone: string){
    this.name = name;
    this.phone = phone;
  }

  equal(c:Contact ): boolean{
    if(!c){
      return false;
    }
    return c.name === this.name && c.phone === this.phone;
  }
}

export class Time{
  minute: number;
  hour: number;

  constructor(hour: number, minutes: number){
    this.hour = hour;
    this.minute = minutes;
  }

  toString(): string{
    let hoursStr = this.hour < 10 ? "0" + this.hour : this.hour;
    let minutesStr = this.minute < 10 ? "0" + this.minute : this.minute;
    return hoursStr + ":" + minutesStr;
  }

  addHour(hour){
    this.hour += hour;
    this.hour = this.hour % 24;
  }

}

export class TimerState{
  type:TimerType;
  time: Time //relevant only for snooze
  //day: Days;

  constructor(){
    this.type = TimerType.Idle;
  }

  setType(type: TimerType){
    this.type = type;
    if(type == TimerType.Alarm || type == TimerType.Idle){
      this.time = null;
    }
  }

  setTime(time: Time){
    this.time = time;
  }

  addSnooze(alarmTime){
    let now = new Date();
    let snoozeTime = new Date(now.getTime() + snoozeMinutes*60000);
    this.time = new Time(snoozeTime.getHours(), snoozeTime.getMinutes());
    //this.day = snoozeTime.getDay();
  }
}

export enum TimerType {
  Alarm,
  Snooze,
  Idle
}
