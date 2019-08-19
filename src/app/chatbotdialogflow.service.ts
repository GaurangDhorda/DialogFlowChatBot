import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatbotdialogflowService {

  constructor(private http: HttpClient) { }
  dialogFLow(sessionID, text) {
    return this.http.post<any> ('http://chatnodejsappdemo.herokuapp.com/dialogflowGateway', {
      sessionId: sessionID,
      queryInput: {
        text: {
          text,
          languageCode: 'en-US'
        }
      }
    });
  }
}
