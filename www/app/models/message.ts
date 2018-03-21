import {Contact} from "./task";
import {TaskChangeStatus} from "./taskChangedModel";

export interface IMessage{
  title: string;
  date: number;
  type: MessageType;
}

export class TaskStatusChangedMessage implements IMessage{
  title: string;
  date: number;
  type: MessageType;
  executor: Contact;
  status: TaskChangeStatus;

  dateToString(){

  }
}

export enum MessageType{
  TaskCompleted = "TaskCompleted",
  TaskCanceled = "TaskCanceled"
}
