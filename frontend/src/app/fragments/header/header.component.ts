import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { log } from 'util';
import { Cookie } from 'ng2-cookies';
import { AppService } from '../../app.service';
declare var $: any;



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  router:Router;
  app: any;
  userLevel: string;
  userName: string;
  homeLangDetails: any[] = [];
  homeData: any;
  homeLang: any[] = [];
  multiLang: any[] = [];
  odia: string = 'ଓଡ଼ିଆ';
  english: string= 'English';
  fontIncrement: number=0;
  userManagementLink: any = {data: { expectedRole: 'NATIONAL'}};
  constructor( router:Router, private appService: AppService) { 
    this.router = router;
    this.app = appService;
    router.events.subscribe((url:any) => {
      this.fontIncrement = 0;
    });

  }

  ngOnInit() {

  
  }

  setFontSize(condition) {
    if(condition == "plus" && this.fontIncrement <=2){
      this.fontIncrement++;
      $(".clsContent *").each(function() {
        $(this).css("font-size",parseInt( $(this).css("font-size").split("px")[0])+2+"px")
      })
    }
    if(condition =="minus" && this.fontIncrement >= -2){
      this.fontIncrement--;
      $(".clsContent *").each(function() {
        $(this).css("font-size",parseInt( $(this).css("font-size").split("px")[0])-2+"px")
      })
    }
    if(condition == "default"){
      let tempThis = this;
      $(".clsContent *").each(function() {
        $(this).css("font-size",parseInt( $(this).css("font-size").split("px")[0])-(2*tempThis.fontIncrement)+"px")
      })
      this.fontIncrement = 0;
    }

  }
  

  switchToLanguage(index) {
    // if(index == 0){
    //   this.staticService.selectedLang = 'odia';
    // }
    // else {
    //   this.staticService.selectedLang = 'english';
    // }
    // // if(this.staticService.contentData.viewName == 'Home'){
    //   this.staticService.reinitializeData(this.staticService.contentData);
    // // }
    // // else {
    //   this.staticPageService.reinitializeData(this.staticPageService.contentData);
    // // }
  }

  logout(){
    this.appService.logout();
    this.app.userName = "";
  }


}
