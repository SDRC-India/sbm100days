import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { StaticPageService } from '../../services/static-page.service';
import { document } from 'angular-bootstrap-md/utils/facade/browser';
declare var $: any;

@Component({
  selector: 'app-video-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.scss']
})
export class VideoGalleryComponent implements OnInit {

  videoGalleryData: any;
  videoGalleryDetails: any[] = [];
  videoGallerySection: any = {};
  videoGallery: any[] = [];
  p: number = 1;
  url: SafeResourceUrl;
  title: any;
  searchTexts: any;
  staticService: StaticPageService;
  constructor(private staticServiceProvider: StaticPageService,private sanitizer: DomSanitizer) {
    this.staticService = staticServiceProvider;
   }

  ngOnInit() {

    this.staticService.getData("Video Gallery").subscribe(data=>{
      this.staticService.reinitializeData(data);
    })
  }

  openVideo(category){
    let id = category.url.split("=")[1];
    document.getElementById('videoIframe').src = 'https://www.youtube.com/embed/' +id; 
    // this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' +id);
    // this.url = category.url.split("=")[1];
    this.title = category.title;
    $("#openVideo").modal("show");
  }

  getId(url) {
    return url.split("=")[1];
  }

}
