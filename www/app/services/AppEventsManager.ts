import {Injectable} from "@angular/core";
import {LogService} from "./LogService";

export interface IEventHandler{
  handlerName: string;
  handleEvent(eventType:string, data:any);
}

@Injectable()
export class EventsManager{

  events: Map<string, IEventHandler[]> = new Map<string, IEventHandler[]>();

  subscribeEvent(eventType: string, handler: IEventHandler){

    LogService.log("In subscribe event: handler type = " + handler.constructor.name + ", event type: " + eventType);

      if(!this.events.has(eventType)){
        this.events.set(eventType,[]);
      }

    this.events.get(eventType).push(handler);
  }

  handleEvent(eventType: string, data?: any){

    LogService.log("In handle event: event type = " + eventType + ", event data: ", data);

    if(this.events.has(eventType)){
      let handlers = this.events.get(eventType);
      for(let handler of handlers){
        handler.handleEvent(eventType, data);
      }
    }
  }

}
