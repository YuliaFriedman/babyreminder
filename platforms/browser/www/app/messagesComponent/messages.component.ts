import {Component, OnInit} from '@angular/core';
import {DataProvider} from "../services/DataProvider";
import {Task} from "../models/task";

@Component({
  selector: 'messages-list',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit{

  //tasks: Task[] = [];

  // constructor(private _dataProvider: DataProvider){
  // }

  ngOnInit(): void {
    // this._dataProvider.getTasks().subscribe(
    //   tasks => this.tasks = tasks
    // );
  }

}
