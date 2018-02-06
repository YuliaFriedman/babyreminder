import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import {Days, Task, Time} from "../../models/task";
import {AppUtils} from "../../services/AppUtils";
import index from "@angular/cli/lib/cli";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {DataProvider} from "../../services/DataProvider";

import {FormControl, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'add-task',
  templateUrl: './add.task.component.html',
  styleUrls: ['./add.task.component.scss']
})
export class AddTaskComponent implements OnInit{

  task: Task;
  appUtils: AppUtils;
  timePickerModel: any;
  title = new FormControl('', [Validators.required]);

  constructor(appUtils: AppUtils, private _eref: ElementRef, public dialog: MatDialog, private dataProvider: DataProvider, private router:Router, private _location: Location){
    this.appUtils = appUtils;
  }

  ngOnInit(): void {
    this.task = this.dataProvider.getNewTask();
    this.timePickerModel = new Time(this.task.time.hour, this.task.time.minute);
    this.title.setValue(this.task.title);
  }

  toggleDay(day: Days): void{
    let dayEnum = Days[day];
    let indexOfDay = this.task.days.indexOf(day);
    if(indexOfDay >= 0){
      this.task.days.splice(indexOfDay, 1);
    }
    else{
      this.task.days.push(day);
    }
  }

  saveTask(): void{
    this.triggerValidation();
    if(this.invalidTask()){
      return;
    }
    this.saveDataToTask();

    this.dataProvider.saveNewTask(this.task).then(function () {
      this._location.back();
    }.bind(this));
  }

  triggerValidation(): void{
    this.title.markAsDirty();
    this.title.markAsTouched();
  }

  invalidTask(): boolean{
    return this.title.invalid;
  }

  getErrorMessage(type) {
    if(type == "title") {
      return this.title.hasError('required') ? 'Title can\'t be empty' : "";
    }
    return "";
  }

  saveDataToTask(){
    this.task.title = this.title.value;
    this.task.time.hour = this.timePickerModel.hour;
    this.task.time.minute = this.timePickerModel.minute;
  }

  cancel(){
    this._location.back();
  }

  openContactsList(){
    this.saveDataToTask();
    this.router.navigateByUrl('/contacts');
  }

}

