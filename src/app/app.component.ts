import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChatbotdialogflowService } from './chatbotdialogflow.service';
import { NbThemeService, NbSidebarService } from '@nebular/theme';
import { CommunicationService } from './loadcomponent/communication.service';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute, NavigationCancel, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'chatbot';
  messages = [];
  loading = false;
  selectName: string;
  boolComponent: boolean;
  chatColumn: boolean;
  enableChatButton: boolean;
  isLoading: boolean;
  iconState: boolean;
  subcription: Subscription = new Subscription ();
  // Random ID to maintain session with server
  sessionId = Math.random().toString(36).slice(-5);
@HostListener('window:resize', ['$event'])
onResize(event) {
  if (window.innerWidth <= 770) {
      this.chatColumn = true;
      this.enableChatButton = true;
      this.iconState = false;
  }
  else{
    this.enableChatButton = false;
    this.iconState = true;
  }
}
  constructor(private http: HttpClient, private chatbotService: ChatbotdialogflowService, private  ts: NbThemeService,
              private ms: CommunicationService, private sidebarService: NbSidebarService,
              private router: Router) {
    this.ts.appendLayoutClass('column');
    this.routerEvents(this.router);
   }
   routerEvents(e: Router) {
     this.subcription.add( e.events.subscribe( eventsName => {
      if (eventsName instanceof NavigationStart) {
        this.isLoading = true;
       // console.log(eventsName.url);
        if (eventsName.url === '/login') {
       } else if (eventsName.url === '/') {
         this.boolComponent = false;
       } else {
         this.boolComponent = true;
       }
      } else if (eventsName instanceof NavigationEnd || eventsName instanceof NavigationCancel ||
                 eventsName instanceof NavigationError) {
                    this.isLoading = false;
      }
     }));
   }
  ngOnInit() {
    this.subcription.add( this.ms.getMessage().subscribe(text =>  {
      this.selectName = text;
      this.iconState = true;
    }));
    (window.innerWidth <= 770) ?  this.iconState = false : this.iconState = true;
    this.boolComponent = false;
    this.enableChatButton  = false;
  }
  chatToggle() {
    this.boolComponent = false;
    this.chatColumn = true;
    this.toggle();
    this.selectName = '';
  }
  clearMessage() {
    this.ms.clearMessage();
    this.toggle();
    this.boolComponent = true;
  }
  toggle() {
    // this.sidebarService.toggle(false, 'left');
    this.sidebarService.toggle(false,'left');
    this.iconState = !this.iconState;
  }
  logoutUser(){
    this.chatbotService.logoutUser();
    this.selectName = '';
    this.router.navigate(['/login']);
  }
  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
