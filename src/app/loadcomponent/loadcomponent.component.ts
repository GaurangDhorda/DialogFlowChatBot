import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommunicationService } from './communication.service';
import { ModelData } from '../modeldata';
import { Subscription, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-loadcomponent',
  templateUrl: './loadcomponent.component.html',
  styleUrls: ['./loadcomponent.component.css']
})
export class LoadcomponentComponent implements OnInit, OnDestroy {
   messages: ModelData [ ];
   isLoading: boolean;
   errorMessage: string;
   subcription: Subscription = new Subscription();
   getHttpData : Observable<ModelData []> = this.ms.getData().pipe(shareReplay(1));
  constructor(private ms: CommunicationService) { }

  ngOnInit() {
    this.isLoading = true;
    this.subcription.add(this.getHttpData.subscribe(data => {
      this.messages = data;
    }, (err) => {this.isLoading = false; this.errorMessage = err; console.log(err); },
       () => this.isLoading = false ));
  }
  getMessage() {
  this.subcription.add(  this.ms.getMessage().subscribe(text => {
      console.log(text);
    }));
  }
  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
