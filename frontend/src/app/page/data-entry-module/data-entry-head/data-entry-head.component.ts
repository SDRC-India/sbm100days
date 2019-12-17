import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-data-entry-head',
  templateUrl: './data-entry-head.component.html',
  styleUrls: ['./data-entry-head.component.scss']
})
export class DataEntryHeadComponent implements OnInit {
  router: Router;
  constructor(router:Router) { 
    this.router = router;
  }
    
  ngOnInit() {
  }

  
}
