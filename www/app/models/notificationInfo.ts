export class NotificationAction{
  id: string;
  type: string;
  title: string;
  emptyText: string;

}

export class NewNotification{
  type: NotificationType;
  data: any;
}

export let ActionGroups = {
  TaskCompletedAlert : "TaskCompletedAlert"
}

export class CustomNotificationData{
  id: string;
  title: string;
  text: string;
  actions: NotificationAction[]
  actionGroupId: string;

  constructor(id:string){
    this.id = id;
  }
}

export enum NotificationType{
  Custom,
  TaskCompletedAlert
}
