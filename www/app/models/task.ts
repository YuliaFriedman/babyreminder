import {Errors, ErrorType} from "./errors";

export class Task {
  title: string;
  days: Days[];
  time: Time;
  isEnabled: boolean;
  repeat: boolean;
  contacts: Contact[];
  timerState:TimerState;

  constructor(){
    let now = new Date();
    this.time = new Time(now.getHours(), now.getMinutes());
    this.isEnabled = true;
    this.days = [];
    this.contacts = [];
    this.timerState = new TimerState();
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

}

export class TimerState{
  type:TimerType;
  time: Time //relevant only for snooze

  constructor(){
    this.type = TimerType.Idle;
  }

  setType(type: TimerType){
    this.type = type;
    if(type == TimerType.Alarm){
      this.time = null;
    }
  }

  setTime(time: Time){
    this.time = time;
  }
}

export enum TimerType {
  Alarm,
  Snooze,
  Idle
}
