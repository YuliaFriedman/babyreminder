import {Component} from '@angular/core';
import {MenuButton} from "../models/menu";
import {EventsManager, IEventHandler} from "../services/AppEventsManager";
import {AppConstants} from "../appConstants";
import {LoginService} from "../services/LoginService";

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  styleUrls: ['./app.menu.component.scss']
})
export class AppMenuComponent implements IEventHandler{
  handlerName: string = "app_menu_component";

  loginButton = new MenuButton(AppConstants.menuIds.login, AppConstants.icons.account, "Login");
  logoutButton = new MenuButton(AppConstants.menuIds.logout, AppConstants.icons.account, "Logout");


  topMenuButtons: MenuButton[];
  bottomMenuButtons: MenuButton[];

  customMenuButtons: MenuButton[] = [];

  constructor( private eventsManager:EventsManager, public loginService:LoginService){

    this.updateTopButtons();

    this.bottomMenuButtons = [
      new MenuButton(AppConstants.menuIds.contact, AppConstants.icons.phone, "Contact"),
      new MenuButton(AppConstants.menuIds.about, AppConstants.icons.info, "About")
    ];

    this.updateCustomButtons([]);

    eventsManager.subscribeEvent(AppConstants.eventTypes.updateMenuButtons, this);
    eventsManager.subscribeEvent(AppConstants.eventTypes.userLoggedIn, this);
    eventsManager.subscribeEvent(AppConstants.eventTypes.userLoggedOut, this);
    eventsManager.subscribeEvent(AppConstants.eventTypes.menuButtonClicked, this);
  }

  handleEvent(eventType: string, data: any) {
    switch (eventType){
      case AppConstants.eventTypes.updateMenuButtons:
        this.updateCustomButtons(data);
        break;
      case AppConstants.eventTypes.userLoggedIn:
        this.updateTopButtons();
        break;
      case AppConstants.eventTypes.userLoggedOut:
        this.updateTopButtons();
        break;
      case AppConstants.eventTypes.menuButtonClicked:

        break;
    }
  }

  updateCustomButtons(customMenuButtons:MenuButton[]){
    this.customMenuButtons = customMenuButtons;//this.topMenuButtons.concat(customMenuButtons, this.bottomMenuButtons);
  }

  menuButtonClicked(id){
    this.toggleMenu();
    this.eventsManager.handleEvent(AppConstants.eventTypes.menuButtonClicked, id);
  }

  toggleMenu(){
    this.eventsManager.handleEvent(AppConstants.eventTypes.toggleMenuButtons);
  }

  updateTopButtons(){
    this.topMenuButtons = [];
    if(this.loginService.isLoggedIn()){
      this.topMenuButtons.push(this.logoutButton);
    }
    else{
      this.topMenuButtons.push(this.loginButton);
    }
  }

}
