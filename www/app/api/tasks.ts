import {Contact, Days, Task, Time} from "../models/task";

export let tasks = [];

function getTask(title, time, days, contacts, repeat, isEnabled){
  let task2 = new Task();
  task2.title = title;
  task2.time = time;
  task2.days = days;
  task2.contacts = contacts;
  task2.repeat = repeat;
  task2.isEnabled = isEnabled;
  return task2;
}

tasks = [getTask("task1", new Time(7, 7), [Days.Friday, Days.Saturday], [new Contact("Danny", "0546683722")], true, false)];

 //tasks = [getTask("task1", new Time(7, 7), [Days.Friday, Days.Saturday], [new Contact("Danny", "0546683722")], true, false),
// getTask("task2", new Time(7, 7), [Days.Friday, Days.Saturday], [new Contact("Danny", "0546683722")], false, false),
// getTask("task3", new Time(7, 7), [Days.Friday, Days.Saturday], [new Contact("Danny", "0546683722")], true, true),
// getTask("task4", new Time(7, 7), [Days.Friday, Days.Saturday], [new Contact("Danny", "0546683722")], true, false),
// getTask("task5", new Time(7, 7), [Days.Friday, Days.Saturday], [new Contact("Danny", "0546683722")], true, true),
// getTask("task6", new Time(7, 7), [Days.Friday, Days.Saturday], [new Contact("Danny", "0546683722")], true, false),
// getTask("task7", new Time(7, 7), [Days.Friday, Days.Saturday], [new Contact("Danny", "0546683722")], false, false),
// getTask("task8", new Time(7, 7), [Days.Friday, Days.Saturday], [new Contact("Danny", "0546683722")], true, false)];
