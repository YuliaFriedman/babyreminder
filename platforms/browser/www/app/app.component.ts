import {Component, OnInit} from '@angular/core';
import {LogService} from "./services/LogService";
import {BackgroundManager} from "./services/BackgroundManager";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{

  constructor(private _logService:LogService, private backgroundManager: BackgroundManager){}

  appInitialized = true;

  ngOnInit(): void {
    // document.addEventListener("deviceready", onDeviceReady, false);
    // function onDeviceReady() {
    //   console.log(device);
    // }
  }

  title = 'app';
}
