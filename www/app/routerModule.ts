import {RouterModule, Routes} from "@angular/router";
import {TasksComponent} from "./tasksComponent/tasks.component";
import {AddTaskComponent} from "./tasksComponent/addTaskComponent/add.task.component";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {MessagesComponent} from "./messagesComponent/messages.component";
import {ContactsListComponent} from "./tasksComponent/contactsListComponent/contacts.list.component";
import {TaskDetailsComponent} from "./tasksComponent/taskDetailsComponent/task.details.component";

const appRoutes: Routes = [
  { path: '', component: TasksComponent, outlet: '' },
  { path: 'add', component: AddTaskComponent, outlet: '' },
  { path: 'messages', component: MessagesComponent, outlet: '' },
  { path: 'contacts', component: ContactsListComponent, outlet: '' },
  { path: 'task-details/:id', component: TaskDetailsComponent, outlet: '' },
  { path: 'edit/:id', component: AddTaskComponent, outlet: '' },
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

