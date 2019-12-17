import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';
import { StaticHomeService } from '../../../service/static-home.service';
import { DragulaService } from 'ng2-dragula';
import { log } from 'util';
import { MyDatePicker, IMyOptions, IMyDateModel, IMyDpOptions } from 'mydatepicker';
import { Constants } from '../../../constants';
import { HttpClient, HttpRequest, HttpEvent } from "@angular/common/http";
import { StaticPageService } from '../../static-page/services/static-page.service';
import { Observable } from "rxjs";
import { document } from 'angular-bootstrap-md/utils/facade/browser';
declare var $: any;

@Component({
  selector: 'app-content-section',
  templateUrl: './content-section.component.html',
  styleUrls: ['./content-section.component.scss']
})
export class ContentSectionComponent implements OnInit {
  @ViewChild('myInput') myInput: ElementRef; 
  apiService: ApiService;
  dataService: DataService;
  staticHomeService: StaticHomeService;
  staticService: StaticPageService;
  warningMsg: any;
  districtTableData: any;
  video: string = "https://www.youtube.com/embed/CD-E-LDc384"
  file: any = [];
  message: any;
  public mytime: Date = new Date();
  currentYear: any = this.mytime.getUTCFullYear();
  currentDate: any = this.mytime.getUTCDate() + 1;
  currentMonth: any = this.mytime.getUTCMonth() + 1; //months from 1-12
  // public selDate: IMyDate = {year: 0, month: 0, day: 0};
  public selDate: string = '';
  public myDatePickerOptions: IMyDpOptions = {
    disableSince: { year: this.currentYear, month: this.currentMonth, day: this.currentDate },
    showTodayBtn: false,
    editableDateField: false,
    dateFormat: 'dd-mm-yyyy',
    yearSelector: false,
    showClearDateBtn: false
  };
  
  @ViewChild('mydp') mydp: MyDatePicker;
  constructor(private apiServiceProvider: ApiService, private dataServiceProvider: DataService, private staticHomeServiceProvider: StaticHomeService, private dragulaService: DragulaService,
    private http: HttpClient, private staticServiceProvider: StaticPageService) {
    this.apiService = apiServiceProvider;
    this.dataService = dataServiceProvider;
    this.staticHomeService = staticHomeServiceProvider;
    this.staticService = staticServiceProvider;
  }
  ngOnInit() {
    this.dataService.a = 1;
    this.dataService.q = 1;
    this.dataService.m = 1;
  }

  // editing preview content value

  // editing page description with saving
  editPageDescription() {
    this.dataService.ifEditingDescription = null;
    $("#editCmsPageDescription").css("background", "#fff");
  }

  editingPageDescription() {
    for (let i = 0; i < this.dataService.selectedMenuLists.listOfQuestionModel.length; i++) {
      if (this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Page Description") {
        this.dataService.shortDescription = this.dataService.selectedMenuLists.listOfQuestionModel[i].value;
      }
    }
    this.http.get(Constants.HOME_URL + Constants.CMS_URL + 'editCmsDescription?viewName=' + this.dataService.viewName + '&description=' + this.dataService.shortDescription).subscribe((data) => {
      this.dataService.ifEditingDescription = true;
      $("#editCmsPageDescription").css("background", "#ddd");
      $("#pageDescriptionSuccess").modal('show');
    }, err => {
      $("#error").modal('show');
    });
  }

  // editing row data of 1st table
  editRowOfTimeperiod(selectedOption, sectionIndex) {
    this.dataService.indexOfSection = sectionIndex;
    this.dataService.selectedRow = selectedOption;
    $(".selectedTableInfo").show();
    for (let i = 0; i < this.dataService.selectedMenuLists.listOfQuestionModel.length; i++) {
      if (this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Timeperiod"
        || this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Document Type"
        || this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Album Name") {
        this.dataService.selectedMenuLists.listOfQuestionModel[i].value = selectedOption;
        this.dataService.showAddOption = false;
      }
      if (this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Title"
        || this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Publish Date"
        || this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Upload File") {
        this.dataService.selectedMenuLists.listOfQuestionModel[i].value = "";
        this.dataService.selectedMenuLists.listOfQuestionModel[i].value = undefined;
        this.selDate = "";
        this.selDate = undefined;
      }
    }
    this.dataService.tableData = this.dataService.fetchedDropdown.filter(d => d.section == selectedOption)[0].data;
    if (this.dataService.indexOfSection > 0) {
      if (Object.keys(this.dataService.tableData[0]).length === 0) {
        this.dataService.noDataFound = true;
        $("#hideTableIfNoData").hide();
      } else {
        $("#hideTableIfNoData").show();
        this.dataService.noDataFound = false;
      }
    }
    $('html,body').animate({
      scrollTop: $('#selectedRowDataInTable').offset().top - 250
    }, 'slow');
    return false;
  }

  // adding new section into 1st table  
  addNewSections() {
    this.dataService.isUpdate = true;
    this.dataService.pageLanguage = this.staticService.selectedLang;
    this.dataService.languageIndex = this.dataService.fetchedDropdown.length;
    for (let i = 0; i < this.dataService.selectedMenuLists.listOfQuestionModel.length; i++) {
      if (this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Document Type"
        || this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Timeperiod"
        || this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Album Name") {
        this.dataService.newSectionName = this.dataService.selectedMenuLists.listOfQuestionModel[i].value;
      }
    }
    this.http.get(Constants.HOME_URL + Constants.CMS_URL + 'sectionAddCmsContent?viewName=' + this.dataService.viewName + '&languageIndex=' + this.dataService.languageIndex
      + '&section=' + this.dataService.newSectionName + '&pageLanguage=' + this.dataService.pageLanguage + '&isUpdate=' + this.dataService.isUpdate).subscribe((data) => {
        $("#addNewSection").modal('show');
      }, err => {
        $("#error").modal('show');
      });
  }


  // reset fields
  cancelOrders() {
    this.dataService.showAddOption = true;
    this.dataService.tableData = [];
    for (let i = 0; i < this.dataService.selectedMenuLists.listOfQuestionModel.length; i++) {
      if (this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Timeperiod"
        || this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Title"
        || this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Publish Date"
        || this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Document Type"
        || this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Album Name"
        || this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "URL"
        || this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "File Name"
        || this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Content"
        || this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Upload File"
        || this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Caption") {
        this.dataService.selectedMenuLists.listOfQuestionModel[i].value = "";
        this.dataService.selectedMenuLists.listOfQuestionModel[i].value = undefined;
        this.dataService.uploadedFile = undefined;
        this.dataService.uploadedFile = "";
        this.dataService.fileName = undefined;
        this.dataService.fileName = "";
        this.selDate = "";
        this.selDate = undefined;
        this.dataService.indexOfEachRowFirst = undefined;
        this.dataService.indexOfEachRowSecond = undefined;
        this.dataService.indexOfSection = undefined;
        this.dataService.noDataFound = false;
      }
    }
  }

  newValue() {
    for (let i = 0; i < this.dataService.selectedMenuLists.listOfQuestionModel.length; i++) {
      if (this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Title") {
        this.dataService.title = this.dataService.selectedMenuLists.listOfQuestionModel[i].value;
      }
      if (this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "File Name") {
        this.dataService.fileName = this.dataService.selectedMenuLists.listOfQuestionModel[i].value;
      }
      if (this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Content") {
        this.dataService.content = this.dataService.selectedMenuLists.listOfQuestionModel[i].value;
      }
      if (this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Caption") {
        this.dataService.caption = this.dataService.selectedMenuLists.listOfQuestionModel[i].value;
      }
    }
  }
  refreshEditedData() {
    this.apiService.getResourceQuestionList().subscribe(res => {
      this.dataService.questions = res;
      this.dataService.allMenuContents = Object.keys(this.dataService.questions).map(key => ({
        type: key,
        keyVal: this.dataService.questions[key]
      }));
      this.dataService.allMenuContents.forEach(element => {
        if (element.type == this.dataService.selectedTabMenuUrl) {
          for (let i = 0; i < this.dataService.selectedMenuLists.listOfQuestionModel.length; i++) {
            if (this.dataService.selectedMenuLists.listOfQuestionModel[i].dependecy == true) {
              this.dataService.languageIndex = this.dataService.indexOfSection;
            }
            if (this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Timeperiod"
              || this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Document Type"
              || this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Album Name") {
              this.dataService.selectedMenuLists.listOfQuestionModel[i].value = this.dataService.selectedRow;
            }
            if (this.dataService.selectedMenuLists.listOfQuestionModel[i].dependecy == false
              && this.dataService.selectedMenuLists.listOfQuestionModel[i].dependentCondition[0] != 'hasChildren'
              && this.dataService.languageIndex == 0) {
              this.dataService.selectedMenuLists.listOfCmsDataDto[0].viewContent[this.staticHomeService.selectedLang][0].data = this.dataService.questions[element.type][0].listOfCmsDataDto[0].viewContent[this.staticHomeService.selectedLang][0].data;
            }
            else if (this.dataService.selectedMenuLists.listOfQuestionModel[i].dependecy == true
              && this.dataService.languageIndex >= 0) {
              this.dataService.fetchedDropdown = this.dataService.questions[element.type][0].listOfCmsDataDto[0].viewContent[this.staticHomeService.selectedLang];
              this.dataService.noDataFound = false;
              if (this.dataService.languageIndex > 0) {
                if (Object.keys(this.dataService.tableData[0]).length === 0) {
                  $(".selectedTableInfo").hide();
                }
              }
              if (this.dataService.languageIndex >= 0) {
                this.dataService.tableData = this.dataService.fetchedDropdown.filter(d => d.section == this.dataService.selectedRow)[0].data;
                $('#hideTableIfNoData').show();
                if (Object.keys(this.dataService.tableData[0]).length > 0) {
                  $(".selectedTableInfo").show();
                  for (let i = 0; i < this.dataService.fetchedDropdown.length; i++) {
                    this.dataService.tableData = this.dataService.fetchedDropdown.filter(d => d.section == this.dataService.selectedRow)[0].data;
                    $('html,body').animate({
                      scrollTop: $('#selectedRowDataInTable').offset().top - 250
                    }, 'slow');
                    return false;
                  }
                }
              }
            }
          }
        }
      });
    })

    for (let i = 0; i < this.dataService.selectedMenuLists.listOfQuestionModel.length; i++) {
      if (this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Title"
        || this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Publish Date"
        || this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Album Name"
        || this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "URL"
        || this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "File Name"
        || this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Content"
        || this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Upload File"
        || this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Caption"
        || this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Description") {
        this.dataService.selectedMenuLists.listOfQuestionModel[i].value = "";
        this.dataService.selectedMenuLists.listOfQuestionModel[i].value = undefined;
        this.dataService.uploadedFile = undefined;
        this.dataService.uploadedFile = "";
        this.dataService.fileName = undefined;
        this.dataService.fileName = "";
        this.selDate = "";
        this.selDate = undefined;
        this.dataService.indexOfEachRowFirst = undefined;
        this.dataService.indexOfEachRowSecond = undefined;
        // this.dataService.indexOfSection = undefined;
        this.file = null;
      }
    }
  }

  refreshAddedData() {
    this.apiService.getResourceQuestionList().subscribe(res => {
      this.dataService.questions = res;
      this.dataService.allMenuContents = Object.keys(this.dataService.questions).map(key => ({
        type: key,
        keyVal: this.dataService.questions[key]
      }));
      this.dataService.allMenuContents.forEach(element => {
        if (element.type == this.dataService.selectedTabMenuUrl) {
          for (let i = 0; i < this.dataService.selectedMenuLists.listOfQuestionModel.length; i++) {
            if (this.dataService.selectedMenuLists.listOfQuestionModel[i].dependecy == false
              && this.dataService.selectedMenuLists.listOfQuestionModel[i].dependentCondition[0] != 'hasChildren'
              && this.dataService.languageIndex == 0) {
              this.dataService.selectedMenuLists.listOfCmsDataDto[0].viewContent[this.staticHomeService.selectedLang][0].data = this.dataService.questions[element.type][0].listOfCmsDataDto[0].viewContent[this.staticHomeService.selectedLang][0].data;
            }
            else if (this.dataService.selectedMenuLists.listOfQuestionModel[i].dependecy == true
              && this.dataService.languageIndex >= 0) {
              this.dataService.fetchedDropdown = this.dataService.questions[element.type][0].listOfCmsDataDto[0].viewContent[this.staticHomeService.selectedLang];
              this.dataService.noDataFound = false;
              if (this.dataService.languageIndex > 0) {
                if (Object.keys(this.dataService.tableData[0]).length === 0) {
                  $(".selectedTableInfo").hide();
                }
              }
              if (this.dataService.languageIndex >= 0) {
                if (Object.keys(this.dataService.tableData[0]).length > 0) {
                  $(".selectedTableInfo").show();
                  for (let i = 0; i < this.dataService.fetchedDropdown.length; i++) {
                    this.dataService.tableData = this.dataService.fetchedDropdown.filter(d => d.section == this.dataService.selectedRow)[0].data;
                    $('html,body').animate({
                      scrollTop: $('#selectedRowDataInTable').offset().top - 250
                    }, 'slow');
                    return false;
                  }
                }
              }
            }
          }
        }
      });
    })
  }

  refreshDeletedData() {
    this.apiService.getResourceQuestionList().subscribe(res => {
      this.dataService.questions = res;
      this.dataService.allMenuContents = Object.keys(this.dataService.questions).map(key => ({
        type: key,
        keyVal: this.dataService.questions[key]
      }));
      this.dataService.allMenuContents.forEach(element => {
        if (element.type == this.dataService.selectedTabMenuUrl) {
          for (let i = 0; i < this.dataService.selectedMenuLists.listOfQuestionModel.length; i++) {
            if (this.dataService.selectedMenuLists.listOfQuestionModel[i].dependecy == false
              && this.dataService.selectedMenuLists.listOfQuestionModel[i].dependentCondition[0] != 'hasChildren'
              && this.dataService.languageIndex == 0) {
              this.dataService.selectedMenuLists.listOfCmsDataDto[0].viewContent[this.staticHomeService.selectedLang][0].data = this.dataService.questions[element.type][0].listOfCmsDataDto[0].viewContent[this.staticHomeService.selectedLang][0].data;
            }
            else if (this.dataService.selectedMenuLists.listOfQuestionModel[i].dependecy == true
              && this.dataService.languageIndex >= 0) {
              this.dataService.fetchedDropdown = this.dataService.questions[element.type][0].listOfCmsDataDto[0].viewContent[this.staticHomeService.selectedLang];
              this.dataService.noDataFound = false;
              $('#hideTableIfNoData').hide();
              if(this.dataService.languageIndex > 0){
                if(Object.keys(this.dataService.tableData[0]).length === 0){
                  $(".selectedTableInfo").hide();
                }
              }
              if(this.dataService.languageIndex >= 0){
                if(Object.keys(this.dataService.tableData[0]).length > 0) {
                  $(".selectedTableInfo").show();
                  for (let i = 0; i < this.dataService.fetchedDropdown.length; i++) {
                    this.dataService.tableData = this.dataService.fetchedDropdown.filter(d => d.section == this.dataService.selectedRow)[0].data;
                    $('html,body').animate({
                      scrollTop: $('#selectedRowDataInTable').offset().top - 250
                    }, 'slow');
                    return false;
                  }
                }
              }
            }
          }
        }
      });
    })
  }
// show fetched data of about scheme
  showFetchedData(){
    this.apiService.getResourceQuestionList().subscribe(res => {
      this.dataService.questions = res;
      this.dataService.allMenuContents = Object.keys(this.dataService.questions).map(key => ({
        type: key,
        keyVal: this.dataService.questions[key]
      }));
      this.dataService.allMenuContents.forEach(element => {
        if (element.type == this.dataService.selectedTabMenuUrl) {
          for (let i = 0; i < this.dataService.selectedMenuLists.listOfQuestionModel.length; i++) {
            if (this.dataService.selectedMenuLists.listOfQuestionModel[i].dependecy == false
              && this.dataService.selectedMenuLists.listOfQuestionModel[i].dependentCondition[0] != 'hasChildren'
              && this.dataService.languageIndex == 0) {
              this.dataService.selectedMenuLists.listOfCmsDataDto[0].viewContent[this.staticHomeService.selectedLang][0].data = this.dataService.questions[element.type][0].listOfCmsDataDto[0].viewContent[this.staticHomeService.selectedLang][0].data;
            }
            else if (this.dataService.selectedMenuLists.listOfQuestionModel[i].dependecy == true
              && this.dataService.languageIndex >= 0) {
              this.dataService.fetchedDropdown = this.dataService.questions[element.type][0].listOfCmsDataDto[0].viewContent[this.staticHomeService.selectedLang];
              this.dataService.noDataFound = false;
              $('#hideTableIfNoData').hide();
              if(this.dataService.languageIndex > 0){
                if(Object.keys(this.dataService.tableData[0]).length === 0){
                  $(".selectedTableInfo").hide();
                }
              }
              if(this.dataService.languageIndex >= 0){
                if(Object.keys(this.dataService.tableData[0]).length > 0) {
                  $(".selectedTableInfo").show();
                  for (let i = 0; i < this.dataService.fetchedDropdown.length; i++) {
                    this.dataService.tableData = this.dataService.fetchedDropdown.filter(d => d.section == this.dataService.selectedRow)[0].data;
                    $('html,body').animate({
                      scrollTop: $('#selectedRowDataInTable').offset().top - 250
                    }, 'slow');
                    return false;
                  }
                }
              }
            }
          }
        }
      });
    })
  }

  // file Upload
  onFileChange(event) {
    let files: any = event.target.files;
    for (let i = 0; i < files.length; i++) {
      if(files[i].type == 'image/jpeg'){
      this.dataService.selectedImageName = event.target.files[i].name;
      for (let i = 0; i < this.dataService.selectedMenuLists.listOfQuestionModel.length; i++) {
        if (this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Upload Image") {
          this.dataService.imageUploadedFilepath = "./assets/images/gallery/" + this.dataService.selectedImageName;
        }
      }
      this.file.push(event.target.files[i]);
      }
      if(files[i].type == 'application/pdf'){
      this.dataService.selectedFileName = event.target.files[i].name;
      for (let i = 0; i < this.dataService.selectedMenuLists.listOfQuestionModel.length; i++) {
      if(this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Upload file"){
        this.dataService.uploadedFilepath = this.dataService.selectedFileName ;
      }
    }
      this.file.push(event.target.files[i]);
      }
      if (this.dataService.selectedFileName != null) {
        this.dataService.uploadedFile = undefined;
        this.dataService.uploadedFile = "";
        this.dataService.fileName = undefined;
        this.dataService.fileName = "";
      }
      if(this.dataService.selectedImageName != null) {
        this.dataService.imageUploadedFile = "";
        this.dataService.imageUploadedFile = undefined;
      }
    }
  }
  onDateChanged(event: IMyDateModel) {
    this.selDate = event.formatted;
    this.dataService.publishedDate = this.selDate;
  }
  onToggleSelector(event: any) {
    event.stopPropagation();
    this.mydp.openBtnClicked();
  }

  // Calling this function clears the selected date
  onClearDate(event: any) {
    event.stopPropagation();
    this.mydp.clearDate();
  }

  // download fetched file
  downloadFetchedFileCms(fileName) {
    window.location.href = Constants.HOME_URL + 'cms/downloadCmsDoc?fileName=' + fileName;
  }
  editRowOfFetchedData(model, index) {
    this.dataService.indexOfEachRowFirst = index;
    for (let i = 0; i < this.dataService.selectedMenuLists.listOfQuestionModel.length; i++) {
      if (this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Upload File") {
        this.dataService.selectedMenuLists.listOfQuestionModel[i].value = "";
        this.dataService.selectedMenuLists.listOfQuestionModel[i].value = undefined;
      }
    }
    for (let i = 0; i < this.dataService.selectedMenuLists.listOfQuestionModel.length; i++) {
      if (this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Title") {
        this.dataService.selectedMenuLists.listOfQuestionModel[i].value = model.title;
        this.dataService.title = model.title;
      }
      if (this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Publish Date") {
        this.selDate = model.publishedDate;
        this.dataService.publishedDate = this.selDate;
      }
      if (this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Upload File") {
        this.dataService.uploadedFilepath = model.fileName;
        this.dataService.uploadedFile = model.fileName.split("/")[2];
        if (this.dataService.uploadedFile == undefined) {
          this.dataService.uploadedFile = model.fileName;
        }
        if (this.dataService.selectedTabMenuUrl == 'documents') {
          this.dataService.uploadedFilepath = model.fileName;
          this.dataService.uploadedFile = model.fileName.split("/")[1];
          if (this.dataService.uploadedFile == undefined) {
            this.dataService.uploadedFile = model.fileName;
          }
        }
        this.dataService.fileName = model.fileName;
      }
      if (this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Caption") {
        this.dataService.selectedMenuLists.listOfQuestionModel[i].value = model.title;
        this.dataService.caption = model.caption;
      }
    }
    $('html,body').animate({
      scrollTop: $('#selectedRowDataInField').offset().top - 250
    }, 'slow');
    return false;
  }

  deleteRowTableData(selectedRowData, indexofRowForDelete) {
    this.dataService.indexOfRowForDelete = indexofRowForDelete;
    this.warningMsg = "Are you sure you want to delete this order ?"
    this.dataService.selectedRowDataFirstType = selectedRowData;
    $("#confirmRejectModal").modal("show");
  }

  deleteRowOfFetchedData(indexofrowFetchedDataDelete) {
    this.dataService.indexOfRowForFetchedDataDelete = indexofrowFetchedDataDelete;
    this.warningMsg = "Are you sure you want to delete this order ?"
    $("#confirmRejectModal").modal("show");
  }

  deleteRowOfTimePeriod(indexOfSections) {
    this.dataService.sectionsSelectedIndex = indexOfSections;
    this.warningMsg = "Are you sure you want to delete this order ?"
    $("#confirmDeleteModal").modal("show");
  }
  deleteSelectedRowDataOfSection() {
    this.dataService.languageIndex = this.dataService.sectionsSelectedIndex;
    this.dataService.pageLanguage = this.staticService.selectedLang;
    this.dataService.selectedRow = "";
    this.http.get(Constants.HOME_URL + Constants.CMS_URL + 'deleteCmsSectionContent?viewName=' + this.dataService.viewName + '&languageIndex=' + this.dataService.languageIndex
      + '&pageLanguage=' + this.dataService.pageLanguage).subscribe((data) => {

        $("#deleteRowSection").modal('show');
      }, err => {
        $("#error").modal('show');
      });
  }


  // deleting row data 
  deleteSelectedRowData() {
    this.dataService.languageIndex = this.dataService.indexOfSection;
    if (this.dataService.languageIndex == undefined) {
      this.dataService.languageIndex = 0;
    }
    for (let i = 0; i < this.dataService.selectedMenuLists.listOfQuestionModel.length; i++) {
      if (this.dataService.selectedMenuLists.listOfQuestionModel[i].dependecy == false
        && this.dataService.selectedMenuLists.listOfQuestionModel[i].dependentCondition[0] != 'hasChildren') {
        this.dataService.dataIndex = this.dataService.indexOfEachRowSecond;
      }
      if ((this.dataService.selectedMenuLists.listOfQuestionModel[i].dependecy == true)) {
        this.dataService.dataIndex = this.dataService.indexOfEachRowFirst;
      }
      if (this.dataService.dataIndex == undefined && this.dataService.selectedMenuLists.listOfQuestionModel[i].dependecy == false
        && this.dataService.selectedMenuLists.listOfQuestionModel[i].dependentCondition[0] != 'hasChildren') {
        this.dataService.dataIndex = this.dataService.indexOfRowForDelete;
      }
      else if (this.dataService.dataIndex == undefined && this.dataService.selectedMenuLists.listOfQuestionModel[i].dependecy == true) {
        this.dataService.dataIndex = this.dataService.indexOfRowForFetchedDataDelete;
      }
    }
    this.dataService.isUpdate = true;
    this.dataService.pageLanguage = this.staticService.selectedLang;
    this.http.get(Constants.HOME_URL + Constants.CMS_URL + 'deleteCmsContent?viewName=' + this.dataService.viewName + '&languageIndex=' + this.dataService.languageIndex
      + '&dataIndex=' + this.dataService.dataIndex + '&pageLanguage=' + this.dataService.pageLanguage).subscribe((data) => {

        $("#deleteRowSection").modal('show');
      }, err => {
        $("#error").modal('show');
      });
  }

  // editing row data of 2nd table
  editRowTableData(selectedRowData, indexOfRow, file) {
    this.dataService.indexOfEachRowSecond = indexOfRow;
    this.upload();
    for (let i = 0; i < this.dataService.selectedMenuLists.listOfQuestionModel.length; i++) {
      if (this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Upload File") {
        this.dataService.selectedMenuLists.listOfQuestionModel[i].value = "";
        this.dataService.selectedMenuLists.listOfQuestionModel[i].value = undefined;
      }
    }
    for (let i = 0; i < this.dataService.selectedMenuLists.listOfQuestionModel.length; i++) {
      if (this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Title") {
        this.dataService.selectedMenuLists.listOfQuestionModel[i].value = selectedRowData.title;
        this.dataService.title = selectedRowData.titlel;
      }
      if (this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "File Name") {
        this.dataService.selectedMenuLists.listOfQuestionModel[i].value = selectedRowData.fileName;
        this.dataService.fileName = selectedRowData.fileName;
      }
      if (this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "URL") {
        this.dataService.selectedMenuLists.listOfQuestionModel[i].value = selectedRowData.url;
        this.dataService.url = selectedRowData.url;
      }
      if (this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Content") {
        this.dataService.selectedMenuLists.listOfQuestionModel[i].value = selectedRowData.content;
        this.dataService.content = selectedRowData.content;
      }
      if (this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Upload File") {
        this.dataService.uploadedFile = selectedRowData.fileName.split("/")[1];
        if (this.dataService.uploadedFile == undefined) {
          this.dataService.uploadedFile = selectedRowData.fileName;
        }
        this.dataService.uploadedFilepath = selectedRowData.fileName;
        this.dataService.fileName = selectedRowData.fileName;
      }
      if (this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "Publish Date") {
        this.dataService.day = selectedRowData.publishedDate.split("-")[0];
        this.dataService.month = selectedRowData.publishedDate.split("-")[1];
        this.dataService.year = selectedRowData.publishedDate.split("-")[2];
        // this.selDate = {year: parseInt(this.dataService.year), month:  parseInt(this.dataService.month), day:  parseInt(this.dataService.day)};
        this.selDate = selectedRowData.publishedDate;
        this.dataService.publishedDate = selectedRowData.publishedDate;
      }
    }
    $('html,body').animate({
      scrollTop: $('#selectedRowDataInField').offset().top - 250
    }, 'slow');
    return false;
  }

  selectDropdown(selectedOption, index) {
    // this.dataService.selectedMenuLists.listOfQuestionModel[index].value = selectedOption.section;
    // this.dataService.tableData = this.dataService.fetchedDropdown.filter(d=>d.section == this.dataService.selectedMenuLists.listOfQuestionModel[index].value)[0].data;
  }

  previewData(){
    this.dataService.contentVal = document.getElementById('contentVal').value;
    for (let i = 0; i < this.dataService.selectedMenuLists.listOfQuestionModel.length; i++) {
    if (this.dataService.selectedMenuLists.listOfQuestionModel[i].label == "File Name"){
      this.dataService.aboutSchemeFileTitle = this.dataService.selectedMenuLists.listOfQuestionModel[i].value;
    }
  }
   $('#previewPage').modal('show');
  }
  publishDataOfPreviewpage(){
    this.submitForm();
  }
  // publishing data
  submitForm() {
    // if(this.selDate == ""){
    //   alert('enter date');
    // } else if(this.dataService.title == "" || this.dataService.title == undefined){
    //   alert('enter title')
    // } else if(this.file == undefined){
    //   alert('upload file')
    // }
    // else{
    this.dataService.languageIndex = 0;
    if (this.dataService.uploadedFile != "") {
      this.file = this.dataService.uploadedFile;
    }
    if(this.dataService.selectedTabMenuUrl != 'aboutus'
      && this.dataService.selectedTabMenuUrl != 'organizationstructure' ){
      this.dataService.dataModel = {
        'imageName': '',
        'content': this.dataService.content,
        'title': this.dataService.title,
        'url': this.dataService.url,
        'createdDate': '',
        'caption': '',
        'fileName': this.dataService.selectedFileName,
        'size': this.file.size / 1000 + 'KB',
        'isLive': true,
        'isNew': false,
        'publishedDate': this.dataService.publishedDate,
        'order': 0,
        'flag': true,
      }
    } else {
      this.dataService.dataModel = {
        'imageName': this.dataService.imageUploadedFilepath,
        'content': this.dataService.contentVal,
        'title': this.dataService.aboutSchemeFileTitle,
        'url': '',
        'createdDate': '',
        'caption': '',
        'fileName': this.dataService.uploadedFilepath,
        'size': this.file.size / 1000 + 'KB',
        'isLive': true,
        'isNew': false,
        'publishedDate': '',
        'order': 0,
        'flag': true,
      }
    }
  

    this.dataService.viewName = this.dataService.viewName;
    this.dataService.languageIndex = this.dataService.indexOfSection;
    if (this.dataService.languageIndex == undefined) {
      this.dataService.languageIndex = 0;
    }
    this.dataService.pageLanguage = this.staticService.selectedLang;
    // this.dataService.isUpdate = true;
    for (let i = 0; i < this.dataService.selectedMenuLists.listOfQuestionModel.length; i++) {
      if (this.dataService.selectedMenuLists.listOfQuestionModel[i].dependecy == false
        && this.dataService.selectedMenuLists.listOfQuestionModel[i].dependentCondition[0] != 'hasChildren') {
        this.dataService.dataIndex = this.dataService.indexOfEachRowSecond;
        this.dataService.isUpdate = true;
      }
      if (this.dataService.selectedMenuLists.listOfQuestionModel[i].dependecy == true) {
        this.dataService.dataIndex = this.dataService.indexOfEachRowFirst;
        this.dataService.isUpdate = true;
      }

      if (this.dataService.dataIndex == undefined && this.dataService.selectedMenuLists.listOfQuestionModel[i].dependecy == false
        && this.dataService.selectedMenuLists.listOfQuestionModel[i].dependentCondition[0] != 'hasChildren') {
        this.dataService.dataIndex = this.dataService.selectedMenuLists.listOfCmsDataDto[0].viewContent[this.staticHomeService.selectedLang][0].data.length;
        this.dataService.isUpdate = false;
      }
      else if (this.dataService.dataIndex == undefined && this.dataService.selectedMenuLists.listOfQuestionModel[i].dependecy == true) {
        this.dataService.dataIndex = this.dataService.tableData.length;
        this.dataService.isUpdate = false;
      }
      if (this.dataService.languageIndex > 0) {
        if (Object.keys(this.dataService.tableData[0]).length === 0) {
          this.dataService.dataIndex = 0;
          this.dataService.isUpdate = true;
        }
        else if (Object.keys(this.dataService.tableData[0]).length > 0) {
          this.dataService.isUpdate = false;
        }
      }
      if(this.dataService.selectedTabMenuUrl == 'aboutus'){
        this.dataService.isUpdate = false;
      }
    }


    this.upload();
    this.http.post(Constants.HOME_URL + Constants.CMS_URL + 'updateAddCmsContent' + '?viewName='
      + this.dataService.viewName + '&languageIndex=' + this.dataService.languageIndex + '&dataIndex='
      + this.dataService.dataIndex + '&pageLanguage=' + this.dataService.pageLanguage + '&isUpdate='
      + this.dataService.isUpdate, this.dataService.dataModel).subscribe(response => {
        if(this.dataService.selectedTabMenuUrl != 'aboutus'){
          $("#pop").modal('show');
        }else{
          $("#withPreviewSubmission").modal('show');
        }
      },
        error => {
          $("#error").modal('show');
        });
    // }
  }

  upload() {
    this.uploadFile(this.file).subscribe(event => {
    });
  }
  uploadFile(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    for (var i = 0; i < this.file.length; i++) { 
      formdata.append("fileUpload[]", this.file);
    }

    // formdata.append("file", file);
    const req = new HttpRequest("POST", Constants.HOME_URL + Constants.CMS_URL + "uploadFile", formdata, {
      reportProgress: true,
      responseType: "text"
    });
    return this.http.request(req);
  }
}
