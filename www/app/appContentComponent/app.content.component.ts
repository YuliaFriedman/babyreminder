import {Component} from '@angular/core';
import {AppConstants} from "../appConstants";
import {EventsManager, IEventHandler} from "../services/AppEventsManager";

@Component({
  selector: 'app-content',
  templateUrl: './app.content.component.html',
  styleUrls: ['./app.content.component.scss']
})
export class AppContentComponent implements IEventHandler{
  handlerName: string = "App Content Component";

  menuOpened = false;

  constructor( private eventsManager:EventsManager){
    eventsManager.subscribeEvent(AppConstants.eventTypes.toggleMenuButtons, this);
  }

  handleEvent(eventType: string, data: any) {
    switch (eventType){
      case AppConstants.eventTypes.toggleMenuButtons:
        this.menuOpened = !this.menuOpened;
        break;
    }
  }

}
