export interface IEventHandler{
  handleEvent(eventType:string, data:any);
}

export class EventsManager{

  events: Map<string, IEventHandler[]>;

  subscribeEvent(eventType: string, handler: IEventHandler){
      if(!this.events.has(eventType)){
        this.events.set(eventType,[]);
      }

    this.events.get(eventType).push(handler);
  }

  handleEvent(eventType: string, data: any){
    if(this.events.has(eventType)){
      let handlers = this.events.get(eventType);
      for(let handler of handlers){
        handler.handleEvent(eventType, data);
      }
    }
  }

}
