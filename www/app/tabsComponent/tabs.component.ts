import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

class TabLink{
  path: string;
  label: string;


  constructor(path: string, label: string){
    this.path = path;
    this.label = label;
  }
}

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit{



  //router: Router
  links: TabLink[];
  activeLinkIndex = 0;

  constructor(private router: Router){}

  ngOnInit(): void {
    this.links = [];
    this.links.push(new TabLink("", "Tasks"));
    this.links.push(new TabLink("/messages", "Messages"));
    this.activeLinkIndex =  this.links.indexOf(this.links.find(tab => this.router.url.indexOf(tab.path) != -1));
  }

}
