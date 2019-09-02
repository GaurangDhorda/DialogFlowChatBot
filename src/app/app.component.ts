import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  subcription: Subscription = new Subscription ();
  // Random ID to maintain session with server
  sessionId = Math.random().toString(36).slice(-5);
@HostListener('window:resize', ['$event'])
onResize(event) {
  if (window.innerWidth <= 770) {
      this.chatColumn = true;
      this.enableChatButton = true;
  }
  else{
    this.enableChatButton = false;
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
        if (eventsName.url === '/') {
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
    this.addBotMessage('Human presence detected 🤖. How can I help you? ');
    this.subcription.add( this.ms.getMessage().subscribe(text =>  {
      this.selectName = text;
    }));
    this.boolComponent = false;
    this.enableChatButton  = false;
    this.onOffChat();
  }

  onOffChat() {
    if (window.innerWidth <= 770) {
      this.enableChatButton= true;
      this.chatColumn = false;
    } else {  this.chatColumn = true; this.enableChatButton = false; }
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
    this.onOffChat();
  }
  toggle() {
    this.sidebarService.toggle(false, 'left');
  }
  handleUserMessage(event) {
    console.log(event);
    const text = event.message;
    this.addUserMessage(text);
    this.loading = true;
    this.subcription.add( this.chatbotService.dialogFLow(this.sessionId, text).subscribe(res => {
        const {fulfillmentText } = res;
        this.addBotMessage(fulfillmentText );
        this.loading = false;
    })) ;
  }
  addUserMessage(text) {
    this.messages.push({
      text,
      sender: 'You',
      reply: true,
      date: new Date()
    });
  }
  addBotMessage(text) {
    this.messages.push({
      text,
      sender: 'Bot',
     // avatar: '/assets/chatbot.png',
      date: new Date()
    });
  }
  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
