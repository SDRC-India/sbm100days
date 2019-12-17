import { Component, OnInit } from '@angular/core';
import { StaticPageService } from '../../services/static-page.service';
import { document } from 'angular-bootstrap-md/utils/facade/browser';
import { Constants } from '../../../../constants';
import { log } from 'util';

@Component({
  selector: 'app-audio-gallery',
  templateUrl: './audio-gallery.component.html',
  styleUrls: ['./audio-gallery.component.scss']
})
export class AudioGalleryComponent implements OnInit {

  p: number = 1;
  searchTexts: any;
  staticService: StaticPageService;
  constructor(private staticServiceProvider: StaticPageService) { 
    this.staticService = staticServiceProvider;
  }

  ngOnInit() {
    this.staticService.getData("Audio Gallery").subscribe(data=>{
      this.staticService.reinitializeData(data);
    })
  }
  
  playAudio(fileName,i){
    let audio = document.getElementById("myAudio" +i); 
    audio.controls =  true;
    audio.src = fileName;
    audio.play();
    document.getElementById('play' +i).style.display = 'none';
    // let w = $(window).width();
    // if(w < 769 && audio.muted == false) {
    //   document.getElementById('audio-link').style.marginLeft = '-16px';
    //   document.getElementsByTagName('audio').style.maxWidth = '104%';
    // }
    document.addEventListener('play', function(e){
    var allAudios = document.getElementsByTagName('audio');
      for(var i = 0; i<allAudios.length; i++){
          if(allAudios[i] != e.target){
              allAudios[i].pause();
          }
      }
  }, true);
  }
  
 
}
