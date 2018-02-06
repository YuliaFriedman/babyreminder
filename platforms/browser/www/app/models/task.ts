import {Errors, ErrorType} from "./errors";

export class Task {
  title: string;
  days: Days[];
  time: Time;
  isEnabled: boolean;
  repeat: boolean;
  contacts: Contact[];

  constructor(){
    let now = new Date();
    this.time = new Time(now.getHours(), now.getMinutes());
    this.isEnabled = true;
    this.days = [];
    this.contacts = [];

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
