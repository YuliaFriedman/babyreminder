import {Days} from "../models/task";
import {Injectable} from "@angular/core";

@Injectable()
export class AppUtils{

  getDaysFriendlyStr(day: Days): string{
    return Days[day].substr(0, 3);
  }

  getDaysFirstChar(day: Days): string{
    return this.getDaysFriendlyStr(day).substr(0, 1);
  }

  nullOrUndefined(obj: any): boolean{
    return obj == undefined || obj == null;
  }

  getTimeString(hour, minute){
    let hoursStr = hour < 10 ? "0" + hour : hour;
    let minutesStr = minute < 10 ? "0" + minute : minute;
    return hoursStr + ":" + minutesStr;
  }
}
