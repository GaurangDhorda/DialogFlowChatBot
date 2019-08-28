import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ModelData } from '../modeldata';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
private subject = new Subject<any>();

  constructor(private http: HttpClient) { }
  getData() {
    return this.http.get<ModelData[]>('https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json')
            .pipe(
              tap( data => console.log('Server data', data)),
              catchError(this.errorhandler)
            );
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
