import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataProvider} from "../services/DataProvider";
import {Task} from "../models/task";
import {Router} from "@angular/router";

@Component({
  selector: 'tasks-list',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy{

  tasks: Task[] = [];
  private sub: any;

  constructor(private _dataProvider: DataProvider, private router:Router){
  }

  ngOnInit(): void {
    this.sub = this._dataProvider.getTasks().subscribe(
      tasks => this.tasks = tasks
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  navigateToDetails(id){
    this.router.navigate(['/task-details', id]);
  }

}
