import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../../services/cms.service';
import { GlobalVariable } from '../../../services/globalvariable.service';
@Component({
  selector: 'app-admincontent',
  templateUrl: './admincontent.component.html',
  styleUrls: ['./admincontent.component.css',
  '../../../../assets/css/material.css',
  '../../../../assets/css/sb-admin-2.min.css',
  '../../../../assets/css/cimb-admin-2.min.css',
  '../../../../assets/vendor/fontawesome-free/css/all.min.css',
  '../../../../assets/vendor/datatables/dataTables.bootstrap4.min.css',
  '../../../../assets/font/font.css']
})
export class AdmincontentComponent implements OnInit {
  lookupcmspagemaster;
  lookupchangeid;
  show: boolean;
  project;
  pageselect;
  changeid;
  text1;
  requirepage: boolean;
  requirechangeid: boolean;
  requiretext: boolean;
  savefail: boolean;
  savesuccess: boolean;
  preview:string;
  constructor(
    private cmsService: CmsService
    , private globalVariable: GlobalVariable
  ) {  }
  // public tools: object = {
  //   items: [
  //       'FullScreen', 'SourceCode' , 'ClearFormat', '|' , 'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
  //       'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
  //       'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
  //       'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
  //       'Indent', 'Outdent', '|', 'CreateLink','CreateTable',
  //       'Image', '|']
  // };
  ngOnInit() {
    //this.globalVariable.webAuthorize();
    this.project = this.globalVariable.getProject();
    this.lookupcmspagemaster = this.cmsService.selectCmsMsLookupPageMaster(this.globalVariable.getProject());
    this.show = (this.globalVariable.getRolecode() === 'ADMIN') ? true : false;
    this.lookupchangeid = this.cmsService.selectCmsLookupChangeID(this.globalVariable.getProject());
    this.clearrequiredata();
    this.clearalert();
    this.cleardata();
    this.preview = "";
  }
  clearrequiredata() {
    this.pageselect = 'null';
    this.changeid = 'null';
  }
  clearalert() {
    console.log('clearalert');
    this.requirepage = false;
    this.requirechangeid = false;
    this.requiretext = false;
    this.savefail = false;
    this.savesuccess = false;
  }
  cleardata() {
    this.text1 = "";
    this.preview = "";
  }

  async selectchangeid(changeid) {
    this.clearalert();
    this.cleardata();
    this.changeid = changeid;
    if (this.changeid != 'null' && this.pageselect != 'null') {
      const cmspagefile = await this.cmsService.selectCmsPageFile(this.pageselect, this.changeid);
      this.text1 = cmspagefile[0]['text1'];
      this.preview = this.text1;
    } else {
      if (this.changeid === 'null' && this.pageselect === 'null') {
        this.requirepage = true;
        this.requirechangeid = true;
      } else if (this.changeid === 'null') {
        this.requirechangeid = true;
      } else {
        this.requirepage = true;
      }
    }
  }
  async selectpage(pageid) {
    this.clearalert();
    this.cleardata();
    this.pageselect = pageid;
    this.changeid = this.globalVariable.getRolecode() === 'ADMIN' ? '' : this.changeid;
    if (this.changeid != 'null' && this.pageselect != 'null') {
      const cmspagefile = await this.cmsService.selectCmsPageFile(this.pageselect, this.changeid);
      this.text1 = cmspagefile[0]['text1'];
      this.preview = this.text1;
    } else {
      if (this.changeid === 'null') {
        this.requirechangeid = true;
      } else {
        this.requirepage = true;
      }
    }
  }

  checkrequiredata(){
    
    if(this.changeid === 'null'){
      this.requirechangeid =  true;
      return false;
    }
    if(this.pageselect === 'null'){
      this.requirepage =  true;
      return false;
    }
    if(this.text1 === ''){
      this.requiretext =  true;
      return false;
    }
    return true;
  }

  async onSubmit(event: any) {
    console.log('onSubmit() was called.');
    this.clearalert();
    this.text1 = event.target.InputText1.value;
    this.changeid = this.globalVariable.getRolecode() === 'ADMIN' ? '' : this.changeid;
    if (this.checkrequiredata() === true) {
      const objData = {
        project: this.globalVariable.getProject(),
        changeid: this.changeid,
        pageid: this.pageselect,
        vertype: this.globalVariable.getRolecode() === 'ADMIN' ? 'Master' : 'Draft',
        text1: this.text1,
        modifiedby: this.globalVariable.getUsernameen(),
        modifiedon: new Date()
      };

      this.cmsService.updCmsPageFile(JSON.stringify(objData));
      this.savesuccess = true;
      this.clearrequiredata();
      this.cleardata();
     
    }
  }


}
