
export class Errors {

  errors: Error[];

  constructor(){
    this.errors = [];
  }

  addError(msg:string, type:ErrorType){
    this.errors.push(new Error(msg, type));
  }

}

export class Error{
  msg:string;
  type:ErrorType;

  constructor(msg:string, type:ErrorType){
    this.msg = msg;
    this.type = type;
  }
}

export enum ErrorType{
  TaskTitle,
  GetContactsFailed
}
