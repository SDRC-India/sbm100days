import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent implements OnInit {
  showDTF: Boolean = true;
  showBTF: Boolean = false
  router: Router;
  constructor(router:Router) { 
    this.router = router;
  }

  ngOnInit() {
  }
  showDTFKeyContacts() {
    this.showDTF = true;
    this.showBTF = false;
  }
  showBTFKeyContacts() {
    this.showDTF = false;
    this.showBTF = true;
  }

}
