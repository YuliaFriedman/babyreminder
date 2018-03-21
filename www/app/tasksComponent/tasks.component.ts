import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataProvider} from "../services/DataProvider";
import {Task} from "../models/task";
import {Router} from "@angular/router";
import {EventsManager, IEventHandler} from "../services/AppEventsManager";
import {AppConstants} from "../appConstants";
import {MenuButton} from "../models/menu";

@Component({
  selector: 'tasks-list',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy, IEventHandler{
  handlerName: string = "tasks_List_component";

  tasks: Task[] = [];
  private sub: any;

  constructor(private _dataProvider: DataProvider, private router:Router, private eventsManager:EventsManager){
    eventsManager.subscribeEvent(AppConstants.eventTypes.menuButtonClicked, this);
  }

  ngOnInit(): void {
    this.sub = this._dataProvider.getTasks().subscribe(
      tasks => this.tasks = tasks
    );

    this.eventsManager.handleEvent(AppConstants.eventTypes.updateMenuButtons, [
      new MenuButton(AppConstants.menuIds.addTask, AppConstants.icons.add, "Add task")
    ]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  navigateToDetails(id){
    this.router.navigate(['/task-details', id]);
  }

  handleEvent(eventType: string, data: any) {
    switch (eventType){
      case AppConstants.eventTypes.menuButtonClicked:
        switch (data){
          case AppConstants.menuIds.addTask:
            this.router.navigate(["/add"]);
        }
        break;
    }
  }

}
