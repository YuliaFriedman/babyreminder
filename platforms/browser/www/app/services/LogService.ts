import {Injectable} from "@angular/core";


@Injectable()
export class LogService{

  log(msg: string, content: any = undefined): void{
    console.log(msg, content);
  }

}
