import {Component, OnInit} from '@angular/core';
import {LogService} from "./services/LogService";
import {BackgroundManager} from "./services/BackgroundManager";
import {NotificationsService} from "./services/NotificationsService";
import {TasksTimer} from "./services/TasksTimerService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{

  constructor(private _logService:LogService, private backgroundManager: BackgroundManager, private notificationsService: NotificationsService, private tasksTimer: TasksTimer,){}

  appInitialized = true;

  ngOnInit(): void {
    // document.addEventListener("deviceready", onDeviceReady, false);
    // function onDeviceReady() {
    //   console.log(device);
    // }
  }

  title = 'app';
}
