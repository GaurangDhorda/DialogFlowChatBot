import { Component, OnInit, Input, HostListener, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunicationService } from '../communication.service';
import { ModelData } from 'src/app/modeldata';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { NbSidebarService, NbPopoverDirective } from '@nebular/theme';
import { element } from 'protractor';

@Component({
  selector: 'app-dynocomponent',
  templateUrl: './dynocomponent.component.html',
  styleUrls: ['./dynocomponent.component.css']
})
export class DynocomponentComponent implements OnInit {
  @Input() i: ModelData ;
  @ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;
  cardSize: string;
  loading: boolean;
  contextmenu: boolean;
  contextmenuX: number;
  contextmenuY: number;
  windowX: number;
  windowY: number;
  on: string;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth <= 770) {
      this.cardSize = 'small';
    } else {
      this.cardSize = 'medium';
    }
  }
  constructor(private inputMessageService: CommunicationService
            , private router: Router, private activatedRoute: ActivatedRoute,
              private sidebarService: NbSidebarService) { }

  ngOnInit() {
    this.windowX = window.innerWidth;
    window.addEventListener('scroll', this.scroll, true);
    if (window.innerWidth <= 770) {
      this.cardSize = 'small';
    } else {
      this.cardSize = 'medium';
    }
    this.loading = true;
  }
  scroll = (e): void => {
    if (e.target.tagName === 'LI' ) { return; }
    if (this.contextmenu === true) {
      this.contextmenu = false;
      document.removeEventListener('mousedown', this.scroll);
    }
  }
  onLoad() {
    this.loading = false;
  }
  closePopup(){
    this.popover.hide();
  }
  itemClick(item: string) {

  }
  selectData(fieldName: string) {
    console.log(fieldName);
    this.inputMessageService.sendMessage(fieldName);
    this.toggle();
  //  this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }
  toggle() {
    this.sidebarService.expand('left');
  }
  contextMenu(event) {
  //  console.log ( 'X: ' + window.innerWidth + ' Y: ' + window.innerHeight);

        if ( this.contextmenu === true) { this.contextmenu = false; } else {
            this.contextmenu = true ;
          }
        this.contextmenuX =  this.windowX - 100;
        this.contextmenuY =   event.clientY;   // event.clientY + 30 ;
        console.log(event);
        document.addEventListener('mousedown', this.scroll, false );
  }
  onResizeMenu(event) {
    this.contextmenu  = true;
    this.windowX = window.innerWidth;
    this.contextmenuX = this.windowX - 100;
    this.contextmenuY = window.innerHeight;
    // this.contextmenuX = event.target.innerWidth - this.contextmenuX;
    // this.contextmenuY = event.target.innerHeight - this.contextmenuY;
}
}
