import { Component, OnInit } from '@angular/core';
import { StaticHomeService } from '../../../service/static-home.service';

@Component({
  selector: 'app-organizationstructure',
  templateUrl: './organizationstructure.component.html',
  styleUrls: ['./organizationstructure.component.scss']
})
export class OrganizationstructureComponent implements OnInit {
staticService: StaticHomeService;
  constructor(private staticServiceProvider: StaticHomeService) { 
    this.staticService = staticServiceProvider;
  }

  ngOnInit() {
  }

}
