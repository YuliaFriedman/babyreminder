import {Injectable} from "@angular/core";
import {AppUtils} from "./AppUtils";
import {EventsManager, IEventHandler} from "./AppEventsManager";
import {AppConstants} from "../appConstants";
import {Router} from "@angular/router";

@Injectable()
export class LoginService implements IEventHandler{
  handlerName: string = "login_service";

  demoUser = "0546666666";
  currentUser;

  constructor(private appUtils:AppUtils, private eventsManager:EventsManager, private router: Router){
    this.currentUser = this.demoUser;
    this.eventsManager.subscribeEvent(AppConstants.eventTypes.menuButtonClicked, this);
  }

  handleEvent(eventType: string, data: any) {
    switch (eventType){
      case AppConstants.eventTypes.menuButtonClicked:
        switch (data){
          case AppConstants.menuIds.login:
            // go to login page
            //this.currentUser = data;
            //this.eventsManager.handleEvent(AppConstants.eventTypes.userLoggedIn, this.currentUser);
            this.router.navigate(['/login']);
            break;
          case AppConstants.menuIds.logout:
            this.currentUser = undefined;
            this.eventsManager.handleEvent(AppConstants.eventTypes.userLoggedOut);
            break;
        }
        break;
    }
  }

  getCurrentUser(){
    return this.currentUser;
  }

  isLoggedIn(){
    return !this.appUtils.nullOrUndefined(this.currentUser);
  }


};
