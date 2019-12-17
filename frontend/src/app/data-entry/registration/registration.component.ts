import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { FormComponent } from 'lib/public_api';
 import * as status from 'http-status-codes';
 import { ToastrService } from 'ngx-toastr';
 import { Location } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  formDetails: any[] = [];
  selectedSection: any;
  sectionName: any;
  formId = 1;
  formSections: any = [];
  finalize = false;
  valid = false;
  @ViewChild('sdrcForm') sdrcForm: FormComponent;
  constructor(private commonService: CommonService,private toastr: ToastrService,private location: Location) { }

  ngOnInit() {
    this.getQuestionList(this.formId);
  }

  getQuestionList(formId) {
    this.commonService.getQuestionList(formId).subscribe((data) => {
      this.formDetails = data;
      this.formDetails = this.formDetails.sort((n1, n2) => {
        if (n1.sectionOrder > n2.sectionOrder) {
          return 1;
        }
        if (n1.sectionOrder < n2.sectionOrder) {
          return -1;
        }
        return 0;
      });
      this.defaultViewforSection();
    });
  }

  defaultViewforSection() {
    // Default view of section
    this.selectedSection = this.formDetails[0];
    this.sectionName = this.formDetails[0].name;
    this.formSections = this.formDetails[0].questions;
    
    this.formSections = this.formSections.sort((n1, n2) => {
      if (n1.key > n2.key) {
        return 1;
      }
      if (n1.key < n2.key) {
        return -1;
      }
      return 0;
    });
  }
  saveForm(data)
  {
    if (this.finalize && this.valid) {
    const submissionData = this.makeNewFormList(this.formDetails);
    this.commonService.finalizeForm(submissionData).subscribe((data) => {
      if (data.statusCode === status.OK) {
         this.toastr.success(data.message, 'Success', {
         });
      } else if (data.statusCode === status.NOT_MODIFIED) {
         this.toastr.warning(data.message, 'Warning', {

         });
      } else if (data.statusCode === status.CONFLICT) {
        // this.toastr.error(data.message, 'Error', {

        // });
      }
      this.location.back();
    });
  }
  }
  async finalizeClicked(){
    this.finalize = true;
    // // $('#submit-button').click();
    this.valid = false;
    for (let i = 0; i < this.formDetails.length; i++) {
      let section = this.formDetails[i]
      if (this.selectedSection !== section) {
        this.selectedSection = section;
        this.formSections = [];
        this.sectionName = section.name;
        this.formSections = section.questions;

        this.sdrcForm.questionArray = this.formSections;
        this.sdrcForm.numberOfColumn = 1;
        this.sdrcForm.ngOnChanges();

        this.formSections = this.formSections.sort((n1, n2) => {
          if (n1.key > n2.key) {
            return 1;
          }
          if (n1.key < n2.key) {
            return -1;
          }
          return 0;
        });
      }
      await this.wait(100);
      $('#submit-button').click();
      if (!this.sdrcForm.form.valid && !this.sdrcForm.form.disabled) {
       
        return false;
      }
    }
    this.valid = true;
    $('#submit-button').click();
    return true;
  }

  makeNewFormList(formlist) {
    const newformlist = [];
    for (const item of formlist) {
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < item.questions.length; index++) {
        newformlist[newformlist.length] = Object.assign(item.questions[index]);
      }
    }
    return newformlist;
  }

  wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  htmltoPDF()
  {
    this.commonService.htmltoPDF(this.formDetails,1);
  }

  

}
