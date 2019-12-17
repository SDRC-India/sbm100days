import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  menus: any[];
  questions: any;
  description: any;
  selectedTabMenu: any;
  selectedTabMenuUrl: string;
  changedMenuList: any[];
  allMenuContents: any = {};
  allCmsPageDescription: any = {};
  selectedMenuLists: any = [];
  selectedMenuListTableData: any = [];
  cmsTableData: any = [];
  fethedTableData: any = [];
  fetchedDropdown: any = [];
  fetchedDropdownDetails: any = [];
  selectionFields: any;
  tableData: any = [];
  shortDescription: any;
  removeColumnList: any = [];  
  selectedRow: any;
  newSectionName: any;
  uploadedFile: any; 
  uploadedFilepath: any;
  imageUploadedFile: any;
  imageUploadedFilepath: any;
  selectedFileName: any;
  selectedImageName: any;
  publishDate: any;
  day: any;
  month: any;
  year: any;
  errorOnSubmit: string = "";
  indexOfEachRowFirst: number;
  indexOfEachRowSecond: number;
  indexOfRowForDelete: number;
  indexOfRowForFetchedDataDelete: number;
  indexOfSection: number;
  sectionsSelectedIndex: number;
  a: number = 1;
  q: number = 1;
  m: number = 1;
  selectedRowDataFirstType: any = [];
  noDataFound: boolean = false;
  withChildren: boolean = true;
  noChildren: boolean =  true;
  dataModel: any = {};
  deletedRowObject: any = {};
  newSectionsAddedObj : any = {};
  selectedSectionForDetetion: any = {};
  publishEditData: any = {};
  editedSectionIndex: number;
  ifEditingDescription: boolean = true;
  showAddOption: Boolean = true;
  // cms model 
  // id: 0;
  imageName: string;
	content: string;
	title: string;
	url: string;
	createdDate: string;
	caption: string;
  fileName: string;
  imageFileName: string;
	size: string;
	isLive: Boolean;
	isNew: Boolean;
	publishedDate: string;
	order: number;
  flag: Boolean;
  viewName: string;
  languageIndex: number = 0;
  dataIndex: number;
  pageLanguage: string;
  isUpdate: Boolean;
  file: File;
  pageDescription: any;
  aboutSchemeFileTitle: any;
  titleForPreview: any;
  headingTitle: any;
  contentVal: any;
  validation: any = {};
  showList: boolean = false;


  showNoCmsData: Boolean = true; 
  constructor() { }

  getKeys(obj){
    return Object.keys(obj)
  }
  
  
}
