import { Injectable } from '@angular/core';
import { Subject, throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ModelData } from '../modeldata';
import { tap, catchError, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
private subject = new Subject<any>();
httpUrl = 'https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json';
getHttpData: Observable<ModelData []> = this.http.get<ModelData []>(this.httpUrl).pipe(
              tap( data => console.log('Server data', data)),
              catchError(this.errorhandler),
              shareReplay(1)
              );

  constructor(private http: HttpClient) { }
  getData() {
    return this.getHttpData;
  }
  errorhandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server error');
  }
  sendMessage(message: string) {
    this.subject.next(message);
  }

  clearMessage() {
    this.subject.next();
  }
  getMessage() {
    return this.subject.asObservable();
  }
}
