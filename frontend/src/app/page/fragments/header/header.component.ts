import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../../app.service'
import { log } from 'util';
import { Cookie } from 'ng2-cookies';
import { StaticHomeService } from '../../../service/static-home.service';
import { document } from 'angular-bootstrap-md/utils/facade/browser';
import { StaticPageService } from '../../static-page/services/static-page.service';
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
  staticService: StaticHomeService;
  staticPageService: StaticPageService
  userManagementLink: any = {data: { expectedRole: 'NATIONAL'}};
  constructor( router:Router, private appService: AppService, private staticServiceProviders: StaticHomeService, private staticPageServiceProviders: StaticPageService) { 
    this.router = router;
    this.app = appService;
    this.staticService = staticServiceProviders;
    this.staticPageService = staticPageServiceProviders;
  }

  ngOnInit() {
    this.staticService.getMenuList('portalMenu').subscribe( data => {
      this.staticService.menus = <any[]> data['viewContent']['english']
    })
    if(Cookie.check('access_token')){
      var token = JSON.parse(Cookie.get('access_token'));
      this.app.userName = token.username;
    }
    else{
      this.app.userName = "";
    }
    this.staticService.getData("Home").subscribe(data=>{
      this.homeData =  data;
      this.homeLang = this.homeData.viewContent;
      this.multiLang = Object.keys(this.homeLang);
      if(this.multiLang[0] == 'odia'){
        this.multiLang[0] = this.odia;
      }
      if(this.multiLang[1] == 'english'){
        this.multiLang[1] = this.english;
      }
    })

  }

  setFontSize(fontSize) {
    $("#bodyMain *").css("font-size", fontSize + "px");

  }
  //handles nav-links which are going to be shown 
  checkUserAuthorization(route) {

    const expectedRoles = route;
    if(Cookie.check('access_token')){
      var token = JSON.parse(Cookie.get('access_token'));
      this.app.userName = token.username;
    }
    let flag = false;
    if (this.appService.checkLoggedIn()) {
      expectedRoles.forEach(expectedRole => {
        if(token.roles[0] == expectedRole){
          flag = true;
        }
      });
      
    }
    return flag;
  }
  switchToLanguage(index) {
    if(index == 0){
      this.staticService.selectedLang = 'odia';
    }
    else {
      this.staticService.selectedLang = 'english';
    }
    // if(this.staticService.contentData.viewName == 'Home'){
      this.staticService.reinitializeData(this.staticService.contentData);
    // }
    // else {
      this.staticPageService.reinitializeData(this.staticPageService.contentData);
    // }
  }

  logout(){
    this.appService.logout();
    this.app.userName = "";
  }


}
