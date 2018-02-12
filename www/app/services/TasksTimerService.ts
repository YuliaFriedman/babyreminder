import {AppFeatureSupportService} from "./appFeaturesSuppertService";
import {DataProvider} from "./DataProvider";
import {TimerType, Task, Days} from "../models/task";
import {Injectable, NgZone} from "@angular/core";
import {EventsManager} from "./AppEventsManager";
import {AppConstants} from "../appConstants";


@Injectable()
export class TasksTimer {

  constructor(private appFeatureSupportService: AppFeatureSupportService, private eventsManager:EventsManager,  private zone:NgZone) {
    //this.setAlarms();
  }

  setAlarms(tasks: Task[]) {
    if (this.appFeatureSupportService.hasWakeupTimer()) {
      let alarms = [];

      for (let task of tasks) {
        let days = this.toAlarmDays(task.days);
        if(days.length > 0){
          let time = {hour: task.time.hour, minute: task.time.minute};
          alarms.push({
            type: 'daylist',
            days: days,
            time: time,
            extra: task
          });
        }
      }

      if (alarms.length > 0) {
        window.wakeuptimer.wakeup(this.alarmCallbak.bind(this), this.alarmError.bind(this), {alarms: alarms});
      }
    }
    else{
      // demo alarm
      let wakeupTime = 1000;
      for (let task of tasks) {
        setTimeout(() => {
          this.alarmCallbak({
            type: "wakeup",
            extra: task
          })
        }, wakeupTime);
        wakeupTime += 60000;
      }
    }
  }

  toAlarmDays(days: Days[]): string[]{
    let alarmDays = [];
    if(days){
      for(let day of days){
        switch (day){
          case Days.Sunday:
            alarmDays.push("sunday");
            break;
          case Days.Monday:
            alarmDays.push("monday");
            break;
          case Days.Tuesday:
            alarmDays.push("tuesday");
            break;
          case Days.Wednesday:
            alarmDays.push("wednesday");
            break;
          case Days.Thursday:
            alarmDays.push("thursday");
            break;
          case Days.Friday:
            alarmDays.push("friday");
            break;
          case Days.Saturday:
            alarmDays.push("saturday");
            break;
        }
      }
    }
    return alarmDays;
  }


  alarmCallbak(result) {
    this.zone.run(() => {
      if (result.type === 'wakeup') {
        console.log('wakeup alarm detected--', result.extra);
        var extra = JSON.parse(result.extra);
        this.eventsManager.handleEvent(AppConstants.eventTypes.wakeAppEvent, extra);
      }
      else if (result.type === 'set') {
        console.log('wakeup alarm set--' + result);
      }
      else {
        console.log('wakeup unhandled type (' + result.type + ')');
      }
    });
  };

  alarmError(error) {

  }
}
