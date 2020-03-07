import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of  } from 'rxjs';
import { map } from 'rxjs/operators';

class User { 
  constructor(public userId: number, public username: string, public password: string, public role: string) {
  }
}

const Users = [
  new User(1, 'user', 'user','user'),
  new User( 2, 'admin', 'admin', 'admin')
];
let observable = of(Users);

@Injectable({
  providedIn: 'root'
})
export class ChatbotdialogflowService {
  isLoggedin: boolean;
  loggedInUser: User;
  redirectUrl = '/chat';
  loginUrl: string = '/login';
  constructor(private http: HttpClient) { }
  dialogFLow(sessionID, text) {
    return this.http.post<any> ('https://chatnodejsappdemo.herokuapp.com/dialogflowGateway', {
      sessionId: sessionID,
      queryInput: {
        text: {
          text,
          languageCode: 'en-US'
        }
      }
    });
  }
  getAllUsers(): Observable <User []>{
    return observable;
  }
  isAuthenticated(username: string, password: string): Observable <boolean>{
    return this.getAllUsers().pipe(
        map( users => {
            let user = users.find( user => (user.username === username) && (user.password === password) );
            if (user) {
              this.isLoggedin = true;
              this.loggedInUser = user;
            } else {
              this.isLoggedin = false;
            }
            return this.isLoggedin;
        })
    );
  }
  isUserLoggedIn(): boolean {
    return this.isLoggedin;
  }
  getRedirectUrl() {
    return this. redirectUrl;
  }
  setRedirectUrl(url: string){
    this.redirectUrl = url;
  }
  getLoginUrl(){
    return this.loginUrl;
  }
  getLoggedInUser() {
    return this.loggedInUser.username;
  }
  logoutUser() {
    this.isLoggedin = false;
  }
}
