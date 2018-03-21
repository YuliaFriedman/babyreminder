import {RouterModule, Routes} from "@angular/router";
import {TasksComponent} from "./tasksComponent/tasks.component";
import {AddTaskComponent} from "./tasksComponent/addTaskComponent/add.task.component";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {MessagesComponent} from "./messagesComponent/messages.component";
import {ContactsListComponent} from "./tasksComponent/contactsListComponent/contacts.list.component";
import {TaskDetailsComponent} from "./tasksComponent/taskDetailsComponent/task.details.component";
import {LoginPageComponent} from "./login/login.component";
import {AppContentComponent} from "./appContentComponent/app.content.component";

const appRoutes: Routes = [
  {
    path: '',
    component: AppContentComponent,
    children: [
      { path: '', component: TasksComponent },
      { path: 'add', component: AddTaskComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'contacts/:id', component: ContactsListComponent },
      { path: 'task-details/:id', component: TaskDetailsComponent },
      { path: 'edit/:id', component: AddTaskComponent },
    ]
  },
  { path: 'login', component: LoginPageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
]

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  exports: [RouterModule],
  providers: [
  ],
  bootstrap: []
})
export class AppRouterModule { }

