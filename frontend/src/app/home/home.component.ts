import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router, RouterState, NavigationEnd } from '@angular/router';
import { StaticHomeService } from '../service/static-home.service';
import { AppService } from '../app.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  whatnew: string = "What's New";
  homeHindiDetails: any[] = [];

  appService: AppService;
  staticService: StaticHomeService;
  private twitter: any;


  constructor(private app: AppService, private staticServiceProvider: StaticHomeService, private router: Router) {
    this.initTwitterWidget();
    this.appService = app;
    this.staticService = staticServiceProvider;
  }

  initTwitterWidget() {
    this.twitter = this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        (<any>window).twttr = (function (d, s, id) {
          let js: any, fjs = d.getElementsByTagName(s)[0],
            t = (<any>window).twttr || {};
          if (d.getElementById(id)) return t;
          js = d.createElement(s);
          js.id = id;
          js.src = "https://platform.twitter.com/widgets.js";
          fjs.parentNode.insertBefore(js, fjs);
          t._e = [];
          t.ready = function (f: any) {
            t._e.push(f);
          };

          return t;
        }(document, "script", "twitter-wjs"));

        if ((<any>window).twttr.ready())
          (<any>window).twttr.widgets.load();
      }
    });
  }
  ngOnInit() {
    //  this.staticService.getData("Home").subscribe(data=>{
    //   this.staticService.reinitializeData(data);

    // })
    // this.rotateNumber();
        
    this.twitter.unsubscribe();

    if (!this.staticService.quickStarts) {
      this.staticService.getQuickStarts().subscribe(data => {
        
        this.staticService.quickStarts = data;
        this.staticService.quickVal = this.staticService.quickStarts.QuickStart;
        setTimeout(()=>{
          if ($('.count').offset()){
            var oTop = $('.count').offset().top - window.innerHeight;
            if ( $(window).scrollTop() > oTop) {
              this.startCount();
            }
          }
        },200)
      })
    }
  }

  // getNewsContent(item){
  //   this.staticService.whatsNewCategory = item;
  //    this.router.navigate(['pages/whatsnewcontent']);
  // }
  ngAfterViewInit(){
    $(window).scroll(() => {
      
      if ($('.count').offset()){
        var oTop = $('.count').offset().top - window.innerHeight;
        if (!this.staticService.countLoaded && this.staticService.quickStarts && $(window).scrollTop() > oTop) {
          this.startCount();
        }
      }
       
    });
    
  }

  startCount(){
    $('.count').each(function (index) {
      var size = $(this).text().split(".")[1] ? $(this).text().split(".")[1].length : 0;
      $(this).prop('Counter', 0).animate({
        Counter: $(this).text()
      }, {
          duration: 5000,
          easing: 'swing',
          step: function (now) {
            $(this).text(parseFloat(now).toFixed(size));
          }
        });
    });
    this.staticService.countLoaded = true;
  }

}