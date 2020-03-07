import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../loadcomponent/communication.service';
import { ChatbotdialogflowService } from '@chatService';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  messages = [];
  subcription: Subscription = new Subscription();
  selectName: string;
  iconState: boolean;
  loading: boolean;
  sessionId = Math.random().toString(36).slice(-5);

  constructor(private ms: CommunicationService, private chatbotService: ChatbotdialogflowService) { }

  ngOnInit() {
    this.addBotMessage('Human presence detected 🤖. How can I help you? ');
  }
  addBotMessage(text) {
    this.messages.push({
      text,
      sender: 'Bot',
     // avatar: '/assets/chatbot.png',
      date: new Date()
    });
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
  ngOnDestroy() {
    this.subcription.unsubscribe();
    console.log('chat destroy fire');
  }
}
