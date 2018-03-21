import {AppFeatureSupportService} from "./appFeaturesSuppertService";
import {DataProvider} from "./DataProvider";
import {TimerType, Task, Days} from "../models/task";
import {Injectable, NgZone} from "@angular/core";
import {EventsManager, IEventHandler} from "./AppEventsManager";
import {AppConstants} from "../appConstants";
import {LogService} from "./LogService";


@Injectable()
export class TasksTimer implements IEventHandler{
  handlerName: string;

  constructor(
    private appFeatureSupportService: AppFeatureSupportService,
    private eventsManager:EventsManager,
    private zone:NgZone,
    private dataProvider:DataProvider
  ) {
    this.handlerName = "TasksTimerService";
    //this.setAlarms();
    eventsManager.subscribeEvent(AppConstants.eventTypes.setAlarm, this);
  }

  handleEvent(eventType: string, data: any) {
    switch (eventType){
      case AppConstants.eventTypes.setAlarm:
        this.setAlarms(data);
        break;
    }
  }

  setAlarms(tasks: Task[]) {
    if (this.appFeatureSupportService.hasWakeupTimer()) {
      let alarms = [];

      for (let task of tasks) {
        if(task.timerState.type == TimerType.Idle){
          continue;
        }
        else if(task.timerState.type == TimerType.Alarm){
          let days = this.toAlarmDays(task.getNotCompletedDays());
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
        else if (task.timerState.type == TimerType.Snooze){
          let time = {hour: task.timerState.time.hour, minute: task.timerState.time.minute};
          alarms.push({
            type: 'onetime',
            time: time,
            extra: task
          });
        }
      }



      if (alarms.length > 0) {
        window.wakeuptimer.wakeup(this.alarmCallbak.bind(this), this.alarmError.bind(this), {alarms: alarms});
        LogService.log("Settings timer: ", alarms);
      }
      else{
        LogService.log("NOT settings timer: ", alarms);
      }
    }
    else{
      // demo alarm
      let wakeupTime = 500;
      for (let task of tasks) {
        if(task.timerState.type == TimerType.Idle){
          continue;
        }
        else if(task.timerState.type == TimerType.Alarm){
          this.setDemoTimer(task, wakeupTime);
        }
        else if (task.timerState.type == TimerType.Snooze){
          this.setDemoTimer(task, wakeupTime);
        }
        wakeupTime += 60000;
      }
    }
  }

  setDemoTimer(task, time){
    setTimeout(() => {
      this.alarmCallbak({
        type: "wakeup",
        extra: JSON.stringify(task)
      })
    }, time);
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
        LogService.log('wakeup alarm detected--', result);
        var extra = JSON.parse(result.extra);
        this.dataProvider.getTaskById(extra.id).subscribe(task => {
          this.eventsManager.handleEvent(AppConstants.eventTypes.wakeupEvent, task);
        });
      }
      else if (result.type === 'set') {
        LogService.log('wakeup alarm set--' + result);
      }
      else {
        LogService.log('wakeup unhandled type (' + result.type + ')');
      }
    });
  };

  alarmError(error) {
    LogService.log("Timer error: ", error);
  }
}
