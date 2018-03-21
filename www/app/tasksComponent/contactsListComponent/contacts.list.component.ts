import {ChangeDetectorRef, Component, ElementRef, Inject, NgZone, OnInit} from '@angular/core';
import {Contact, Days, Task, Time} from "../../models/task";
import {AppUtils} from "../../services/AppUtils";
import index from "@angular/cli/lib/cli";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, ProgressSpinnerMode} from "@angular/material";
import {DataProvider} from "../../services/DataProvider";

import {FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';
import {AppFeatureSupportService} from "../../services/appFeaturesSuppertService";
import {LogService} from "../../services/LogService";
import {EventsManager} from "../../services/AppEventsManager";
import {AppConstants} from "../../appConstants";

@Component({
  selector: 'contacts-list',
  templateUrl: './contacts.list.component.html',
  styleUrls: ['./contacts.list.component.scss']
})
export class ContactsListComponent implements OnInit{

  newContact: Contact;

  newContactName = new FormControl('', [Validators.required]);
  newContactPhone = new FormControl('', [Validators.required]);

  contacts: Contact[] = [];
  getContactsError: Error;
  filteredContacts: Contact[];
  searchValue:string;

  waitingForContacts = true;
  sub: any;
  sub2:any;
  currentTask: Task;

  constructor(
    private dataProvider: DataProvider,
    private router:Router,
    private _location: Location,
    private _changeDetectorRef: ChangeDetectorRef,
    private zone:NgZone,
    private route: ActivatedRoute,
    private eventsManager:EventsManager){

  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      if(params.hasOwnProperty('id')) {
        this.sub2 = this.dataProvider.getTaskById(params['id']).subscribe(task => {
        this.currentTask = task;
        this.getContacts();
        });
      }
      else{
        this.currentTask = this.dataProvider.getNewTask();
        this.getContacts();
      }
    });

    this.eventsManager.handleEvent(AppConstants.eventTypes.updateMenuButtons, []);

  }

  getContacts(){
    this.dataProvider.getContacts().subscribe(next => {
      this.contacts = next;
      this.markSelectedContacts(this.contacts);
      LogService.log("Contacts (in contacts list component): ", this.contacts);
      //this._changeDetectorRef.detectChanges();
      this.filteredContacts = this.contacts;
      this.waitingForContacts = false;
    }, error => {
      this.getContactsError = error;
    });
  }

  search(){
    this.filteredContacts = this.contacts.filter((value, index) => {
      if((value.name && value.name.includes(this.searchValue)) || (value.phone && value.phone.includes(this.searchValue))){
        return value;
      }
    });
    if(this.filteredContacts.length == this.contacts.length){
      this.filteredContacts = this.contacts;
    }
  }

  addNewContact() {
    if (!this.newContact) {
      this.newContact = new Contact("", "");
      this.newContact.isNew = true;
    }
  }

  removeNewContact(){
    this.newContactName.setValue("");
    this.newContactName.markAsUntouched();
    this.newContactPhone.setValue("");
    this.newContactPhone.markAsUntouched();
    this.newContact = null;
  }

  saveNewContact(){
    this.newContactName.markAsDirty();
    this.newContactName.markAsTouched();

    this.newContactPhone.markAsDirty();
    this.newContactPhone.markAsTouched();

    if(this.newContactName.invalid || this.newContactPhone.invalid){
      return;
    }

    this.newContact.name = this.newContactName.value;
    this.newContact.phone = this.newContactPhone.value;
    this.newContact.isSelected = true;
    this.newContact.isNew = false;
    this.contacts.splice(0, 0, this.newContact);
    this.newContact = null;
  }

  toggleContactSelection(contact: Contact, event){
    contact.isSelected = !contact.isSelected;
    event.preventDefault();
  }

  saveContacts(){
    //var selectedContacts = [];
    var selectedContacts = this.contacts.filter(item => item.isSelected );
    //this.dataProvider.setContactsInNewTask(selectedContacts);
    this.currentTask.contacts = selectedContacts;
    this._location.back();
  }

  markSelectedContacts(contacts){
    if(this.currentTask && this.currentTask.contacts){
      for(let newC of this.currentTask.contacts){
        let found = false;
        for(let c of contacts){
          if(newC.equal(c)){
            c.isSelected = true;
            found = true;
            break;
          }
        }
        if(!found){
          newC.isSelected = true;
          contacts.splice(0, 0, newC);
        }
      }
    }
  }

  cancel(){
    this._location.back();
  }
}

