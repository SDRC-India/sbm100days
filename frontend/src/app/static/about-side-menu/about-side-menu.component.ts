import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-about-side-menu',
  templateUrl: './about-side-menu.component.html',
  styleUrls: ['./about-side-menu.component.scss']
})
export class AboutSideMenuComponent implements OnInit {
  router: Router;
  constructor(router:Router) { 
  this.router = router;
  }
  
  ngOnInit() {
  }

}
