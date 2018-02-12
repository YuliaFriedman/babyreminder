import {Component} from '@angular/core';
import {AppUtils} from "../../services/AppUtils";
import {DataProvider} from "../../services/DataProvider";

import {AppFeatureSupportService} from "../../services/appFeaturesSuppertService";
import {EventsManager} from "../../services/AppEventsManager";
import {BackgroundManager} from "../../services/BackgroundManager";

@Component({
  selector: 'tester',
  templateUrl: './tester.component.html'
})
export class TesterComponent{

  constructor(
    private appUtils: AppUtils,
    private dataProvider: DataProvider,
    private appFeatureSupportService: AppFeatureSupportService,
    private eventsManager:EventsManager,
    private backgroundManager: BackgroundManager){

  }

  test(){
    let result = this.appFeatureSupportService.hasBackgroundService();
  }

}

