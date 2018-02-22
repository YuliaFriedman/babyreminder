import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Task} from "../../models/task";
import {ActivatedRoute} from "@angular/router";
import {DataProvider} from "../../services/DataProvider";
import {Location} from "@angular/common";
@Component({
  selector: 'task-details',
  templateUrl: './task.details.component.html',
  styleUrls: ['./task.details.component.scss']
})
export class TaskDetailsComponent implements OnInit, OnDestroy{

  task: Task;
  sub: any;
  sub2:any;

  constructor(private route: ActivatedRoute, private dataProvider:DataProvider, private _location: Location,){

  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.sub2 = this.dataProvider.getTaskById(params['id']).subscribe(task => {
        this.task = task;
      });
    });
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
}

