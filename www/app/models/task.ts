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

    this.completedDays = [];
  }

  snoozeTask(){
    this.timerState.setType(TimerType.Snooze);
    this.timerState.addSnooze(this.time);
  }

  skipTask(){
    this.timerState.setType(TimerType.Alarm);
  }

  stopTask(){
    this.isEnabled = false;
    this.timerState.setType(TimerType.Idle);
  }

  completeTask(){
    this.timerState.setType(TimerType.Alarm);
    let today = new Date().getDay();
    if(!this.repeat){
      this.completedDays.push(today);
    }
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
