import {Component, OnInit} from '@angular/core';
import {DataProvider} from "../services/DataProvider";
import {Task} from "../models/task";
import {IMessage, TaskStatusChangedMessage} from "../models/message";
import {AppConstants} from "../appConstants";
import {EventsManager, IEventHandler} from "../services/AppEventsManager";
import {MenuButton} from "../models/menu";

@Component({
  selector: 'messages-list',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit{
  handlerName: string = "Messages_component";

  messages: IMessage[] = [];

  constructor(private _dataProvider: DataProvider, private eventsManager:EventsManager){

   }

  ngOnInit(): void {
    this._dataProvider.getMessages().subscribe(
      messages => this.messages = messages
    );

    this.eventsManager.handleEvent(AppConstants.eventTypes.updateMenuButtons, []);
  }

  asTaskStatusChangedMessage(message:IMessage) : TaskStatusChangedMessage{
    return message as TaskStatusChangedMessage;
  }


}
