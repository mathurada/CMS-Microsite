import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../../services/cms.service'
import { GlobalVariable } from '../../../services/globalvariable.service';
import { JitCompiler } from '@angular/compiler';
@Component({
  selector: 'app-generatepage',
  templateUrl: './generatepage.component.html',
  styleUrls: ['./generatepage.component.css',
  '../../../../assets/css/sb-admin-2.min.css',
  '../../../../assets/css/cimb-admin-2.min.css',
  '../../../../assets/vendor/fontawesome-free/css/all.min.css',
  '../../../../assets/vendor/datatables/dataTables.bootstrap4.min.css',
  '../../../../assets/font/font.css']
})
export class GeneratepageComponent implements OnInit {
  lookupcmsproject;
  lookupcmspagemaster;
  project;
  projectselect;
  pageselect;
  requireproject:boolean;
  requirepage:boolean;
  savefail:boolean;
  savesuccess:boolean;
  alertMsg;
  constructor(
    private cmsService:CmsService
    ,private globalVariable:GlobalVariable
  ) { }
  ngOnInit() {
    console.log('Welcome to generatepage page');
    //this.globalVariable.webAuthorize();
    this.project = this.globalVariable.getProject();
    this.lookupcmsproject = this.cmsService.selectCmsLookupProject(this.project);
    this.lookupcmspagemaster = this.cmsService.selectCmsMsLookupPageMaster(this.project);
    this.clearrequiredata();
    this.clearalert();
    this.cleardata();
  }
  clearrequiredata() {
    this.projectselect = 'null';
    this.pageselect = 'null';
  }
  clearalert() {
    console.log('clearalert');
    this.requireproject = false;
    this.requirepage = false;
    this.savefail = false;
    this.savesuccess = false;
  }
  cleardata() {

  }
  async selectproject(projectid) {
    this.clearalert();
    this.cleardata();
    this.projectselect = projectid;
    this.lookupcmspagemaster = this.cmsService.selectCmsMsLookupPageMaster(this.projectselect);
     
  }
  async selectpage(pageid){
    this.clearalert();
    this.cleardata();
    this.pageselect = pageid;
  }

  checkrequiredata(){
    
    if(this.projectselect === 'null'){
      this.requireproject =  true;
      return false;
    }
    if(this.pageselect === 'null'){
      this.requirepage =  true;
      return false;
    }
    return true;
  }

  async onSubmit(event: any) {
    console.log('onSubmit() was called.');
    this.clearalert();
    if (this.checkrequiredata() === true) {
      const objData = { 
        project: this.project, 
        pageid: this.pageselect,
        changeid: '', 
        vertype: this.globalVariable.getRolecode()=== 'ADMIN' ? 'Master': 'Draft',   
        modifiedby: this.globalVariable.getUsernameen(), 
        modifiedon: new Date()
      };
      this.cmsService.insCmsGeneratePage(JSON.stringify(objData));
      this.alertMsg = 'Save Success, project=' + this.project+ 'pageid=' +this.pageselect;
      this.savesuccess=true;
      this.clearrequiredata();
      this.cleardata();
    } 
  }
  async onUploadPageFile(event: any) {
    console.log('onUploadPageFile() was called.');
    this.cmsService.UploadCmsPagefile();
    this.alertMsg = 'Save Success, project=' + this.project+ 'pageid=' +this.pageselect;
    this.savesuccess=true;
    
  }
  async onUploadPictureFile(event: any) {
    console.log('onUploadPictureFile() was called.');
    this.cmsService.UploadCmsPicturefile();
    this.alertMsg = 'Save Success, project=' + this.project+ 'pageid=' +this.pageselect;
    this.savesuccess=true;
    
  }
  async onUploadSystemFile(event: any) {
    console.log('onUploadSystemFile() was called.');
    this.cmsService.UploadCmsSystemfile();
    this.alertMsg = 'Save Success, project=' + this.project+ 'pageid=' +this.pageselect;
    this.savesuccess=true;
    
  }

}
