import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunicationService } from '../communication.service';
import { ModelData } from 'src/app/modeldata';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-dynocomponent',
  templateUrl: './dynocomponent.component.html',
  styleUrls: ['./dynocomponent.component.css']
})
export class DynocomponentComponent implements OnInit {
  @Input() i: ModelData ;
  cardSize: string;
  loading: boolean;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth <= 770) {
      this.cardSize = 'small';
    } else {
      this.cardSize = 'medium';
    }
  }
  constructor(private inputMessageService: CommunicationService
            , private router: Router, private activatedRoute: ActivatedRoute,
              private sidebarService: NbSidebarService) { }

  ngOnInit() {
    if (window.innerWidth <= 770) {
      this.cardSize = 'small';
    } else {
      this.cardSize = 'medium';
    }
    this.loading = true;
  }
  onLoad() {
    this.loading = false;
  }
  selectData(fieldName: string) {
    console.log(fieldName);
    this.inputMessageService.sendMessage(fieldName);
    this.toggle();
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }
  toggle() {
    this.sidebarService.expand('left');
  }
}
