import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {
  MatCheckboxModule, MatDialogModule,
  MatFormField, MatFormFieldControl, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule,
  MatSelectModule, MatSidenav,
  MatSidenavModule,
  MatSlideToggleModule,
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

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    TasksComponent,
    TaskItemComponent,
    AddTaskComponent,
    MessagesComponent,
    ContactsListComponent
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
    ReactiveFormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRouterModule,
    NgbModule.forRoot()
  ],
  providers: [DataProvider, AppUtils, AppFeatureSupportService, LogService, {provide: APP_BASE_HREF, useValue : '/' }], //, AppStore
  bootstrap: [AppComponent]
})
export class AppModule { }
