import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  router: Router;
  constructor(router: Router) { 
    this.router =router;
  }
  ngAfterViewInit() {
    $(".main-content").css("min-height", $(window).height() - 240);
  }

  ngOnInit() {
    /** start of header fix on scroll down **/
    $(window).scroll(function () {
      // console.log($(window).scrollTop())
      if ($(window).scrollTop() > 149 && $(window).width() < 2000) {
        $('#header').addClass('navbar-fixed');
        $(".left-list").addClass('left-side-scroll');
      }
      if ($(window).scrollTop() < 149 && $(window).width() < 2000) {
        $('#header').removeClass('navbar-fixed');
        $(".left-list").removeClass('left-side-scroll');
      }
    });
    /** end of header fix on scroll down **/

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });
  }

 

  ngAfterViewChecked() {
    if ($(window).width() <= 992) {
      $(".collapse").removeClass("show");
      $(".navbar-nav .nav-item").not('.dropdown').click(function () {
        $(".collapse").removeClass("show");
      })
    }
    $(".main-content").css("min-height", $(window).height() - 240);
  }

}
