import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {
  MatCheckboxModule, MatDialogModule,
  MatFormField, MatFormFieldControl, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule,
  MatProgressSpinnerModule,
  MatSelectModule, MatSidenav,
  MatSidenavModule,
  MatSlideToggleModule, MatSpinner,
  MatTabsModule
} from "@angular/material";

import {TabsComponent} from "./tabsComponent/tabs.component";
import {TasksComponent} from "./tasksComponent/tasks.component";
import {TaskItemComponent} from "./tasksComponent/taskItem/task.item.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataProvider} from "./services/DataProvider";
import {AppUtils} from "./services/AppUtils";
import {AddTaskComponent} from "./tasksComponent/addTaskComponent/add.task.component";
import {AppRouterModule} from "./routerModule";
import {APP_BASE_HREF} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MessagesComponent} from "./messagesComponent/messages.component";
import {ContactsListComponent} from "./tasksComponent/contactsListComponent/contacts.list.component";
import {AppFeatureSupportService} from "./services/appFeaturesSuppertService";
import {LogService} from "./services/LogService";
import {TasksTimer} from "./services/TasksTimerService";
import {TaskAlertComponent} from "./alertsComponent/taskAlertComponent/task.alert.component";
import {EventsManager} from "./services/AppEventsManager";
import {BackgroundManager} from "./services/BackgroundManager";
import {TesterComponent} from "./tasksComponent/testerComponent/tester.component";
import {NotificationsService} from "./services/NotificationsService";
import {TaskDetailsComponent} from "./tasksComponent/taskDetailsComponent/task.details.component";
import {AppHeaderComponent} from "./headerComponent/app.header.component";
import { AmazingTimePickerModule } from 'amazing-time-picker';
import {TaskMessageComponent} from "./messagesComponent/taskMessageComponent/task.message.component";
import {AppMenuComponent} from "./menuComponent/app.menu.component";
import {LoginService} from "./services/LoginService";
import {LoginPageComponent} from "./login/login.component";
import {AppContentComponent} from "./appContentComponent/app.content.component";

interface ExtendedNotificatoin extends Notification{
  beep(times: number);
  vibrate(time:number);
  confirm(message: string,
          confirmCallback: (choice: number) => void,
          title?: string,
          buttonLabels?: string[]);
}

declare global {
  interface Navigator {
    contacts: any;
    notification: ExtendedNotificatoin;
  }
}


declare global {
  interface Window {
    wakeuptimer: any,
    cordova: any
  }
}


@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    TasksComponent,
    TaskItemComponent,
    AddTaskComponent,
    MessagesComponent,
    TaskMessageComponent,
    ContactsListComponent,
    TaskAlertComponent,
    TesterComponent,
    TaskDetailsComponent,
    AppHeaderComponent,
    AppMenuComponent,
    LoginPageComponent,
    AppContentComponent
  ],
  imports: [
    BrowserModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRouterModule,
    AmazingTimePickerModule,
    MatSidenavModule,
    NgbModule.forRoot()
  ],
  providers: [
    DataProvider,
    AppUtils,
    AppFeatureSupportService,
    TasksTimer,
    EventsManager,
    BackgroundManager,
    NotificationsService,
    LoginService,
    {provide: APP_BASE_HREF, useValue : '/' }
    ], //, AppStore
  bootstrap: [AppComponent]
})
export class AppModule { }
