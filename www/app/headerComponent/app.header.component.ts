import {Component} from '@angular/core';
import {MenuButton} from "../models/menu";
import {EventsManager, IEventHandler} from "../services/AppEventsManager";
import {AppConstants} from "../appConstants";

@Component({
  selector: 'app-header',
  templateUrl: './app.header.component.html',
  styleUrls: ['./app.header.component.scss']
})
export class AppHeaderComponent implements IEventHandler{
  handlerName: string;

  title:string;

  constructor( private eventsManager:EventsManager){
    this.title = "Baby Reminder";
    eventsManager.subscribeEvent(AppConstants.eventTypes.updateMenuButtons, this);
  }

  handleEvent(eventType: string, data: any) {
    switch (eventType){

    }
  }

  toggleMenu(){
    this.eventsManager.handleEvent(AppConstants.eventTypes.toggleMenuButtons);
  }

}
