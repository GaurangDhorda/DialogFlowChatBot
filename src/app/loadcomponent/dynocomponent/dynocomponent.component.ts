import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunicationService } from '../communication.service';
import { ModelData } from 'src/app/modeldata';

@Component({
  selector: 'app-dynocomponent',
  templateUrl: './dynocomponent.component.html',
  styleUrls: ['./dynocomponent.component.css']
})
export class DynocomponentComponent implements OnInit {
  @Input() i: ModelData ;
  cardSize: string;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth <= 770) {
      this.cardSize = 'small';
    } else {
      this.cardSize = 'medium';
    }
  }
  constructor(private inputMessageService: CommunicationService) { }

  ngOnInit() {
    if (window.innerWidth <= 770) {
      this.cardSize = 'small';
    } else {
      this.cardSize = 'medium';
    }
  }
}
