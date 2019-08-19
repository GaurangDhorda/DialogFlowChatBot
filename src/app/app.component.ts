import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatbotdialogflowService } from './chatbotdialogflow.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chatbot';
  messages = [];
  loading = false;
  // Random ID to maintain session with server
  sessionId = Math.random().toString(36).slice(-5);

  constructor(private http: HttpClient, private chatbotService: ChatbotdialogflowService) { }

  ngOnInit() {
    this.addBotMessage('Human presence detected 🤖. How can I help you? ');
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
      avatar: '/assets/chatbot.png',
      date: new Date()
    });
  }
}
