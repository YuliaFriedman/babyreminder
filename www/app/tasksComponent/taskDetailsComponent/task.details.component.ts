import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DaysHelper, Task} from "../../models/task";
import {ActivatedRoute} from "@angular/router";
import {DataProvider} from "../../services/DataProvider";
import {Location} from "@angular/common";
import {TaskChangedData, TaskChangeStatus} from "../../models/taskChangedModel";
import {AppConstants} from "../../appConstants";
import {EventsManager, IEventHandler} from "../../services/AppEventsManager";
import {AppUtils} from "../../services/AppUtils";
import {MenuButton} from "../../models/menu";

@Component({
  selector: 'task-details',
  templateUrl: './task.details.component.html',
  styleUrls: ['./task.details.component.scss']
})
export class TaskDetailsComponent implements OnInit, OnDestroy, IEventHandler{
  handlerName: string = "Task_details_component";

  task: Task;
  sub: any;
  sub2:any;
  daysHelper;

  constructor(public appUtils: AppUtils, private route: ActivatedRoute, private dataProvider:DataProvider, private _location: Location, private eventsManager:EventsManager){
    this.daysHelper = DaysHelper;
    eventsManager.subscribeEvent(AppConstants.eventTypes.menuButtonClicked, this);
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.sub2 = this.dataProvider.getTaskById(params['id']).subscribe(task => {
        this.task = task;
      });
    });

    this.eventsManager.handleEvent(AppConstants.eventTypes.updateMenuButtons, [
      new MenuButton(AppConstants.menuIds.deleteTask, AppConstants.icons.delete, "Delete task")
    ]);
  }


  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }

    if(this.sub2){
      this.sub2.unsubscribe();
    }
  }

  back(){
    this._location.back();
  }

  enableValueChanged(task): void{
    if(task.isEnabled){
      this.eventsManager.handleEvent(AppConstants.eventTypes.taskStatusChanged, new TaskChangedData(task, TaskChangeStatus.Stop));
    }
    else{
      this.eventsManager.handleEvent(AppConstants.eventTypes.taskStatusChanged, new TaskChangedData(task, TaskChangeStatus.Start));
    }
  }

  handleEvent(eventType: string, data: any) {
    switch (eventType){
      case AppConstants.eventTypes.menuButtonClicked:
        switch (data){
          case AppConstants.menuIds.deleteTask:
            this.dataProvider.deleteTask(this.task);
            this.back();
        }
        break;
    }
  }

}

