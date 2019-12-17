import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StaticPageService } from '../../services/static-page.service';
// import {SubPhotoGalleryComponent} from '../sub-photo-gallery/sub-photo-gallery.component'



@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {


  galleryData: any;
  galleryDetails: any[] = [];
  gallerySection: any = {};
  photoCategory : any[] = [];
  p: number = 1;
  searchTexts: any;
  staticService: StaticPageService;
  constructor(private staticServiceProvider: StaticPageService,private router: Router) { 
    this.staticService = staticServiceProvider;
  }

  // @ViewChild(SubPhotoGalleryComponent) subPhotoGalleryComponent;
  
  ngOnInit() {
    this.staticService.getPhotogalleryData("Photo Gallery").subscribe(data=>{
      // this.staticService.reinitializeData(data);
      this.galleryData = data;
      this.galleryDetails = this.galleryData.viewContent.english;
      for(var i=0;i<this.galleryDetails.length;i++){
        this.gallerySection = this.galleryDetails[i].data;
      }
    })
  }
  getSubCategory(subPhoto){
    this.staticService.imageCategory = subPhoto;
    this.router.navigate(['pages/sub-photo-gallery']);
  }

}
