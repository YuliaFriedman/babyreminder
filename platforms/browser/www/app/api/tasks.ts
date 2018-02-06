import {Contact, Days, Task, Time} from "../models/task";

export let tasks = [];

let task1 = new Task();
task1.title = "task 1";
task1.time = new Time(7, 7);
task1.days = [Days.Friday, Days.Saturday];
task1.contacts = [new Contact("Danny", "0546683722")];

let task2 = new Task();
task2.title = "task 2";
task2.time = new Time(14, 7);
task2.days = [Days.Friday, Days.Saturday];
task2.contacts = [new Contact("Danny", "0546683722"), new Contact("Mom", "05466666666")];
task2.repeat = true;
task2.isEnabled = true;

tasks.push(task1, task2);
