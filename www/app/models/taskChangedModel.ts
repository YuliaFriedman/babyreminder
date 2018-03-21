import {Task, TimerType} from "./task";

export class TaskChangedData{
  task: Task;
  status: TaskChangeStatus;

  constructor(task:Task, status:TaskChangeStatus){
    this.task = task;
    this.status = status;
  }
}


export enum TaskChangeStatus{
  Snooze = "snooze",
  Stop = "stop",
  Complete = "complete",
  Start = "start"
}
