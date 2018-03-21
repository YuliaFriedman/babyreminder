import {Component, OnInit} from '@angular/core';
import {LogService} from "./services/LogService";
import {BackgroundManager} from "./services/BackgroundManager";
import {NotificationsService} from "./services/NotificationsService";
import {TasksTimer} from "./services/TasksTimerService";
import {EventsManager, IEventHandler} from "./services/AppEventsManager";
import {AppConstants} from "./appConstants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  appInitialized = true;

  constructor(){

  }

}
