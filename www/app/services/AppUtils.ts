import {Days} from "../models/task";
import {Injectable} from "@angular/core";
declare var cordova;

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

}
