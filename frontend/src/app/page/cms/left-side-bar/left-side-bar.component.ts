import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, animate, style, state, group } from '@angular/animations'
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { log } from 'util';
import { StaticHomeService } from '../../../service/static-home.service';
declare var $:any;

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.scss']
})
export class LeftSideBarComponent implements OnInit {

  router: Router;
  visible: boolean = false;
  dataService: DataService;
  menuOrderList = 'menuList';
  subMenuOrderList = 'subMenuOrderList';
  subs = new Subscription();
  menuListDetails: any = [];
  menuLists: any = [];
  maps: Map<string,any[]>;
  staticHomeService: StaticHomeService;
  constructor(private route: Router, private apiService: ApiService, private dataServiceProvider: DataService, private dragulaService: DragulaService,
  private staticHomeServiceProvider: StaticHomeService) {
    this.router = route;
    this.dataService = dataServiceProvider;
    this.staticHomeService = staticHomeServiceProvider;
    this.subs.add(dragulaService.dropModel(this.menuOrderList)
      .subscribe(({ el, target, source, sourceModel, targetModel, item }) => {
        this.dataService.changedMenuList = targetModel;
        console.log(targetModel);
      })
    );
    this.subs.add(dragulaService.dropModel(this.subMenuOrderList)
      .subscribe(({ el, target, source, sourceModel, targetModel, item }) => {
        this.dataService.changedMenuList = targetModel;
        console.log(targetModel);
      })
    );
   }

  ngOnInit() {
    $(".side-bar-container").css("min-height", $(window).height()-150);
    if(!this.dataService.menus){
      this.getMenuList();
    } 
    $("body:not(.rename-btn,.menu-input)").click(function(){
      $(".menu-input").attr("disabled", "true")
    })
    if(!this.dataService.questions){
      this.getInnerPageQuestions();
    }
   
  }
  getMenuList(){
    this.apiService.getMenuList().subscribe(res => {
      this.dataService.menus = <any[]>res['viewContent']['english'];
      
    })
  }
  setSubmenu(event){
    if(!$(event.target).closest('.menu').hasClass("active")){
      $(".menu.active").find(".submenu-list").slideUp();
      $(".menu.active").removeClass("active")
      $(event.target).closest('.menu').find('.submenu-list').slideDown();
      $(event.target).closest('.menu').addClass("active")
    }
    else{
    $(event.target).closest('.menu').removeClass("active")
    $(event.target).closest('.menu').find('.submenu-list').slideUp();
    }
  }

  renameMenu(event){
    event.stopPropagation();
    $(event.target).closest('.menu').find("a input").removeAttr('disabled');
  }

  getPageContentData(event, menu){
    this.dataService.showList = true;
    this.dataService.a = 1;
    this.dataService.q = 1;
    this.dataService.m = 1;
    this.dataService.indexOfEachRowFirst = undefined;
    this.dataService.indexOfEachRowSecond = undefined;
    this.dataService.selectedTabMenu = menu;
    this.dataService.selectedTabMenuUrl = menu.url.split("/")[1];
    if(this.dataService.selectedTabMenuUrl == "sanctionorders"
      || this.dataService.selectedTabMenuUrl == "letters"
      || this.dataService.selectedTabMenuUrl == "photo-gallery"){
      this.dataService.showAddOption = true;
    }
    this.dataService.allMenuContents.forEach(element => {
      if(element.type == this.dataService.selectedTabMenuUrl) {
        this.dataService.tableData = [];
        this.dataService.showNoCmsData = false;
        this.dataService.selectedMenuLists = element.keyVal[0];
        this.dataService. uploadedFile = "";
        this.dataService.fileName = "";
        for (let i = 0; i < this.dataService.selectedMenuLists.listOfCmsDataDto.length; i++) {
          this.dataService.viewName = this.dataService.selectedMenuLists.listOfCmsDataDto[i].viewName;
          }

        // this.dataService.selectedMenuListTableData = element.keyVal[0].listOfCmsDataDto;
        this.dataService.fetchedDropdown = this.dataService.selectedMenuLists.listOfCmsDataDto[0].viewContent.english;
        for(let i = 0; i<this.dataService.fetchedDropdown.length; i++){
          this.dataService.fetchedDropdownDetails = this.dataService.fetchedDropdown[i].data;
          if(this.dataService.selectedTabMenuUrl == 'aboutus'){
            this.dataService.aboutSchemeFileTitle = this.dataService.fetchedDropdownDetails[0].title;
          }
        }
        for (let i = 0; i < this.dataService.selectedMenuLists.listOfQuestionModel.length; i++) {
          this.dataService.selectedMenuLists.listOfQuestionModel[i].value = "";
          this.dataService.shortDescription = this.dataService.selectedMenuLists.listOfCmsDataDto[0].viewType;
          if (this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Page Description"){
            this.dataService.selectedMenuLists.listOfQuestionModel[i].value = this.dataService.shortDescription;
          }
          if(this.dataService.selectedTabMenuUrl == 'aboutus'){
            this.dataService.headingTitle = menu.title;
            if (this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "File Name"){
              this.dataService.selectedMenuLists.listOfQuestionModel[i].value = this.dataService.aboutSchemeFileTitle;
            }
            if (this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Upload Image") {
              this.dataService.imageUploadedFile = this.dataService.fetchedDropdownDetails[0].imageName.split("/")[4];
              if (this.dataService.imageUploadedFile == undefined) {
                this.dataService.imageUploadedFile = this.dataService.fetchedDropdownDetails[0].imageName;
              }
              this.dataService.imageUploadedFilepath = this.dataService.fetchedDropdownDetails[0].imageName;
              this.dataService.imageFileName = this.dataService.fetchedDropdownDetails[0].imageName;
            }
            if (this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Upload File") {
              this.dataService.uploadedFile = this.dataService.fetchedDropdownDetails[0].fileName;
              // this.dataService.uploadedFile = this.dataService.fetchedDropdownDetails[0].fileName.split("/")[1];
              if (this.dataService.uploadedFile == undefined) {
                this.dataService.uploadedFile = this.dataService.fetchedDropdownDetails[0].fileName;
              }
              this.dataService.uploadedFilepath = this.dataService.fetchedDropdownDetails[0].fileName;
              this.dataService.fileName = this.dataService.fetchedDropdownDetails[0].fileName;
            }
          }
          }
        this.dataService.removeColumnList = [];
        if(this.dataService.selectedTabMenuUrl == 'letters' || this.dataService.selectedTabMenuUrl == 'sanctionorders' 
        || this.dataService.selectedTabMenuUrl == 'documents'){
          this.dataService.withChildren =  false;
          this.dataService.removeColumnList = ['fileName', 'createdDate', 'isLive', 'size','publishedDate','order','flag','isNew','caption','imageName','content'];
        }else if(this.dataService.selectedTabMenuUrl == 'photo-gallery'){
          this.dataService.withChildren =  false;
          this.dataService.removeColumnList =  ['fileName', 'createdDate', 'isLive', 'size', 'imageName','url'];
        } else if(this.dataService.selectedTabMenuUrl == 'bestpratices' || this.dataService.selectedTabMenuUrl == 'activities'){
          this.dataService.noChildren =  false;
          this.dataService.removeColumnList =  ['fileName', 'createdDate', 'isLive', 'size', 'imageName','order','flag','isNew','caption'];
        }
        else{
          this.dataService.noChildren =  false;
          this.dataService.removeColumnList =  ['fileName', 'createdDate', 'isLive', 'size', 'imageName','order','flag','isNew','caption','content'];
        }
      }
      // this.dataService.languageIndex = 0;
    });
  }

  getInnerPageQuestions(){
    let keyVal: any;
    this.apiService.getResourceQuestionList().subscribe(res => {
      this.dataService.questions = res;
      this.dataService.allMenuContents = Object.keys(this.dataService.questions).map(key => ({
        type: key, 
        keyVal: this.dataService.questions[key]
      }));
    })
  }

  onDrag(args) {
    let [e, el] = args;
    // do something
  }
  onDrop(args) {
    let [e, el] = args;
    // do something
  }
  
  onOver(args) {
    let [e, el, container] = args;
    // do something
    $(el).stopPropagation();
  }
  
  onOut(args) {
    let [e, el, container] = args;
    // do something
  }
  alertDblClick(msg, event){
    event.stopPropagation();
    console.log(msg);
    
  }
}
