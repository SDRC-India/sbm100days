import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../../../constants';
import { StaticHomeService } from '../../../service/static-home.service';

@Component({
  selector: 'app-whatsnewcontent',
  templateUrl: './whatsnewcontent.component.html',
  styleUrls: ['./whatsnewcontent.component.scss']
})
export class WhatsnewcontentComponent implements OnInit {

  whatnewcontentData: any;
  whatnewcontentDetails: any[] = [];
  whatnewcontentSection: any[] = [];
  isDesc: any;
  column: any;
  direction: number;
  staticService: StaticHomeService;
  constructor(private router: Router,
    private statichomeService: StaticHomeService) {
    this.staticService = statichomeService;
  }

  ngOnInit() {
    if (!this.statichomeService.whatsNewCategory) {
      this.router.navigate(['pages/whatsnew']);
    }
  }
  redirectToWhatsNew() {
    this.router.navigate(['pages/whatsnew']);
  }

  downloadFiles(fileName) {
    window.location.href = Constants.HOME_URL + 'cms/downloadCmsDoc?fileName=' + fileName;
  }
}
