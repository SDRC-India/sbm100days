import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submission-home',
  templateUrl: './submission-home.component.html',
  styleUrls: ['./submission-home.component.scss']
})
export class SubmissionHomeComponent implements OnInit {
  tableData: any;
  tableColumns: string[];
  cciInfo: any = [];
  cciKeys: any;

  constructor(private commonService: CommonService , private router: Router) { }

  ngOnInit() {
    this.commonService.getLandingData().subscribe((data) => {
      this.tableData = data.submissionDetailsMap.tableData;
      this.tableColumns = data.submissionDetailsMap.tableColumn;
    });
  }

  clickToNavigate(id: number) {
    this.commonService.submissionId = 0;
    this.router.navigate(['/add-swachhagrahi']);
  }

  actionClicked(rowObj: any) {
    this.commonService.submissionId = rowObj.rowObj.id;
    if (rowObj.target.includes('approved-edit')) {
      this.router.navigate(['/add-swachhagrahi']);
    } 
    }

}
