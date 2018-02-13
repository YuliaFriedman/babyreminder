import {Component, OnInit} from '@angular/core';
import {LogService} from "./services/LogService";
import {BackgroundManager} from "./services/BackgroundManager";
import {NotificationsService} from "./services/NotificationsService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{

  constructor(private _logService:LogService, private backgroundManager: BackgroundManager, private notificationsService: NotificationsService){}

  appInitialized = true;

  ngOnInit(): void {
    // document.addEventListener("deviceready", onDeviceReady, false);
    // function onDeviceReady() {
    //   console.log(device);
    // }
  }

  title = 'app';
}
