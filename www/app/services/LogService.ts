import {Injectable} from "@angular/core";

export let LogService = {

  log(msg: string, content: any = undefined): void{
    console.log(msg, content);
  }

};
