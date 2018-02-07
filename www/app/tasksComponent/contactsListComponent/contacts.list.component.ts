import {ChangeDetectorRef, Component, ElementRef, Inject, NgZone, OnInit} from '@angular/core';
import {Contact, Days, Task, Time} from "../../models/task";
import {AppUtils} from "../../services/AppUtils";
import index from "@angular/cli/lib/cli";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, ProgressSpinnerMode} from "@angular/material";
import {DataProvider} from "../../services/DataProvider";

import {FormControl, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {Location} from '@angular/common';
import {AppFeatureSupportService} from "../../services/appFeaturesSuppertService";
import {LogService} from "../../services/LogService";

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

  constructor(private dataProvider: DataProvider, private router:Router, private _location: Location, private _changeDetectorRef: ChangeDetectorRef, private _logService: LogService,
              private zone:NgZone){

  }

  ngOnInit(): void {
    this.dataProvider.getContacts().subscribe(next => {
        this.contacts = next;
        this._logService.log("Contacts (in contacts list component): ", this.contacts);
        //this._changeDetectorRef.detectChanges();
        this.filteredContacts = this.contacts;
        this.waitingForContacts = false;
    }, error => {
      this.getContactsError = error;
    });
    //this.filteredContacts = this.contacts;
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
    this.dataProvider.setContactsInNewTask(selectedContacts);
    this._location.back();
  }

  cancel(){
    this._location.back();
  }
}

