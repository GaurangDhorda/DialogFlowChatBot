import { Component, OnInit } from '@angular/core';
import { CommunicationService } from './communication.service';
import { ModelData } from '../modeldata';

@Component({
  selector: 'app-loadcomponent',
  templateUrl: './loadcomponent.component.html',
  styleUrls: ['./loadcomponent.component.css']
})
export class LoadcomponentComponent implements OnInit {
   messages: ModelData [ ];
  constructor(private ms: CommunicationService) { }

  ngOnInit() {
    this.ms.getData().subscribe(data => {
      this.messages = data;
    });
  }

}
