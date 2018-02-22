import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import {Days, Task, Time} from "../../models/task";
import {AppUtils} from "../../services/AppUtils";
import index from "@angular/cli/lib/cli";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {DataProvider} from "../../services/DataProvider";

import {FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {AmazingTimePickerService} from "amazing-time-picker";

@Component({
  selector: 'add-task',
  templateUrl: './add.task.component.html',
  styleUrls: ['./add.task.component.scss']
})
export class AddTaskComponent implements OnInit{


  origTask:Task;
  task: Task;
  appUtils: AppUtils;
  timePickerModel: any;
  title = new FormControl('', [Validators.required]);
  isInEdit:boolean;
  sub: any;
  sub2:any;

  constructor(
    appUtils: AppUtils,
    private _eref: ElementRef,
    public dialog: MatDialog,
    private dataProvider: DataProvider,
    private router:Router,
    private _location: Location,
    private route: ActivatedRoute,
    private atp: AmazingTimePickerService){
    this.appUtils = appUtils;
    this.origTask = new Task();
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      // edit
      if(params.hasOwnProperty('id')){
        this.isInEdit = true;
        this.sub2 = this.dataProvider.getTaskById(params['id']).subscribe(task => {
          this.task = task;
          this.origTask.copy(task);
          this.timePickerModel = new Time(this.task.time.hour, this.task.time.minute);
          this.title.setValue(this.task.title);
        });
      }
      else{ // add
        this.isInEdit = false;
        this.task = this.dataProvider.getNewTask();
        this.timePickerModel = new Time(this.task.time.hour, this.task.time.minute);
        this.title.setValue(this.task.title);
      }
    });
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

    if(!this.isInEdit){
      this.dataProvider.saveNewTask(this.task).then(function () {
        this._location.back();
      }.bind(this));
    }
    else{
      this._location.back();
    }
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
    this.task.copy(this.origTask);
    this._location.back();
  }

  openContactsList(){
    this.saveDataToTask();
    this.router.navigateByUrl('/contacts');
  }

  openTimePicker(){
    const amazingTimePicker = this.atp.open({
      time: this.task.time.toString(),
      arrowStyle: {
        background: '#60c1ce',
        color: "white"
      }
    });
    amazingTimePicker.afterClose().subscribe(time => {
      let result = time.split(":");
      this.task.time.hour = +result[0];
      this.task.time.minute = +result[1];
    });
  }

}

