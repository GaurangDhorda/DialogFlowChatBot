import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatbotdialogflowService } from './chatbotdialogflow.service';
import { NbThemeService, NbSidebarService } from '@nebular/theme';
import { CommunicationService } from './loadcomponent/communication.service';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chatbot';
  messages = [];
  loading = false;
  selectName: string;
  boolComponent: boolean;
  chatColumn: boolean;
  // Random ID to maintain session with server
  sessionId = Math.random().toString(36).slice(-5);
@HostListener('window:resize', ['$event'])
onResize(event) {
  if (window.innerWidth <= 770) {
      this.chatColumn = false;
  } else { this.chatColumn = true; }
}
  constructor(private http: HttpClient, private chatbotService: ChatbotdialogflowService, private  ts: NbThemeService,
              private ms: CommunicationService, private sidebarService: NbSidebarService,
              private router: Router) {
    this.ts.appendLayoutClass('column');
    this.routerEvents(this.router);
   }
   routerEvents(e: Router) {
     e.events.subscribe( eventsName => {
      if (eventsName instanceof NavigationStart) {
       // console.log(eventsName.url);
       if (eventsName.url === '/') {
         this.boolComponent = false;
       } else {
         this.boolComponent = true;
       }
      }
     });
   }
  ngOnInit() {
    this.addBotMessage('Human presence detected 🤖. How can I help you? ');
    this.ms.getMessage().subscribe(text =>{
      this.selectName = text;
    });
    this.boolComponent = false;
    this.onOffChat();
  }
  onOffChat() {
    if (window.innerWidth <= 770) {
      this.chatColumn = false;
    } else {  this.chatColumn = true; }
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
    this.chatbotService.dialogFLow(this.sessionId, text).subscribe(res => {
        const {fulfillmentText } = res;
        this.addBotMessage(fulfillmentText );
        this.loading = false;
    });
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
}
