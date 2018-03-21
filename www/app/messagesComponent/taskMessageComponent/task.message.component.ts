import {Component, Input, OnInit} from '@angular/core';
import {IMessage, TaskStatusChangedMessage} from "../../models/message";
import {DataProvider} from "../../services/DataProvider";
@Component({
  selector: 'task-message',
  templateUrl: './task.message.component.html',
  styleUrls: ['./task.message.component.scss']
})
export class TaskMessageComponent implements OnInit{

  @Input() message: TaskStatusChangedMessage;

  constructor(private _dataProvider: DataProvider){
  }

  ngOnInit(): void {

  }

}
