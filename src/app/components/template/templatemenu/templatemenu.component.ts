import { Component, OnInit , Input, Output } from '@angular/core';
import { GlobalVariable } from '../../../services/globalvariable.service'
import { CmsService } from '../../../services/cms.service';
@Component({
  selector: 'app-templatemenu',
  templateUrl: './templatemenu.component.html',
  styleUrls: ['./templatemenu.component.css',
  '../../../../assets/css/sb-admin-2.min.css',
  '../../../../assets/css/cimb-admin-2.min.css',
  '../../../../assets/vendor/fontawesome-free/css/all.min.css',
  '../../../../assets/vendor/datatables/dataTables.bootstrap4.min.css',
  '../../../../assets/font/font.css']
})
export class TemplatemenuComponent implements OnInit {
   // Declare for new version
  cmsmenu;
  // Declare for old version
  project: string;
  rolecode: string;
  showCatagoryHome = true;
  showCatagoryChangeRequest = true;
  showRequest = true;
  showApprove = true;
  showNewRequest = true;
  showGeneratePage = true;
  showCatagoryEditor = true;
  showEditContentPage = true;
  showEditPicture = true;
  showEditHeader = true;
  showEditFooter = true;
  showEditMenu = true;
  showEditLayoutPage = true;
  showEditMetaTag = true;
  showEditAdminContent = true;
  showEditSystemContent = true;
  showCatagoryParameter = true;
  showEditMetaParam = true;
  showeditPrefix = true;
  showEditCity = true;
  showManageUser = true;
  showManageRole = true;
  showManageMenuRole = true;
  showEditOccupation = true;
  showCatagoryReport = true;
  constructor(
    private cmsService:CmsService
    ,private globalVariable: GlobalVariable
  ) { }
  ngOnInit() {
    // Logic for new version 
    this.cmsmenu = this.cmsService.selectCmsMenuRole();
    // Logic for old version 
    this.rolecode = this.globalVariable.getRolecode();
    if( this.rolecode == 'CHECKER'){
      console.log('TemplateMenu: Hello Checker');
      this.showCatagoryHome = false;
      this.showCatagoryChangeRequest = false;
      this.showApprove = false;
      this.showCatagoryReport = false;
    }else if(this.rolecode ==  'MAKER'){
      console.log('TemplateMenu: Hello Maker'); 
      this.showCatagoryHome = false;
      this.showCatagoryChangeRequest = false;
      this.showRequest = false;
      // this.showApprove = false;
      this.showNewRequest = false;
      this.showCatagoryEditor = false;
      this.showEditContentPage = false;
      this.showEditPicture = false;
      this.showEditHeader = false;
      this.showEditFooter = false;
      this.showEditMenu = false;
      // this.showEditLayoutPage = false; // modifiedon:20200120
      this.showEditMetaTag = false;
      // this.showEditAdminContent = false;
      // this.showCatagoryParameter = false;
      // this.showEditMetaParam = false;
      // this.showeditPrefix = false;
      // this.showEditCity = false;
      // this.showEditOccupation = false;
      // this.showCatagoryReport = false;
    }else{
      console.log('TemplateMenu: Hello Admin');
      this.showCatagoryHome = false;
      this.showCatagoryChangeRequest = false;
      this.showRequest = false;
      this.showApprove = false;
      this.showGeneratePage = false;
      this.showCatagoryEditor = false;
      this.showEditContentPage = false;
      this.showEditPicture = false;
      this.showEditHeader = false;
      this.showEditFooter = false;
      this.showEditMenu = false;
      this.showEditLayoutPage = false;
      this.showEditMetaTag = false;
      this.showEditAdminContent = false;
      this.showEditSystemContent = false;
      this.showCatagoryParameter = false;
      this.showEditMetaParam = false;
      this.showeditPrefix = false;
      this.showEditCity = false;
      this.showManageUser = false;
      this.showManageRole = false;
      this.showManageMenuRole = false;
      this.showEditOccupation = false;
      this.showCatagoryReport = false;
    }
  }
}