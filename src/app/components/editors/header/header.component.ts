import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../../services/cms.service';
import { GlobalVariable } from '../../../services/globalvariable.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css',
  '../../../../assets/css/material.css',
  '../../../../assets/css/sb-admin-2.min.css',
  '../../../../assets/css/cimb-admin-2.min.css',
  '../../../../assets/vendor/fontawesome-free/css/all.min.css',
  '../../../../assets/vendor/datatables/dataTables.bootstrap4.min.css',
  '../../../../assets/font/font.css']
})
export class HeaderComponent implements OnInit {
  lookupcmsheader;
  lookupchangeid;
  show:boolean;
  cmsheader;
  headerselect;
  changeid;
  starttext;
  endtext;
  requirepage:boolean;
  requirechangeid:boolean;
  requiretextstart: boolean;
  requiretextend: boolean;
  savefail:boolean;
  savesuccess:boolean;
  preview:string;
  constructor(
    private cmsService: CmsService
    ,private globalVariable: GlobalVariable
  ) { }
  public tools: object = {
    items: [
        'FullScreen', 'SourceCode' , 'ClearFormat', '|' , 'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
        'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
        'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
        'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
        'Indent', 'Outdent', '|', 'CreateLink','CreateTable',
        'Image', '|']
  };
  ngOnInit() {
    console.log('Welcome to Header page');
    //this.globalVariable.webAuthorize();
    this.lookupcmsheader = this.cmsService.selectCmsMsLookupHeader(this.globalVariable.getProject());
    this.show = (this.globalVariable.getRolecode()==='ADMIN') ? true: false; 
    this.lookupchangeid = this.cmsService.selectCmsLookupChangeID(this.globalVariable.getProject());
    this.clearrequiredata();
    this.clearalert();
    this.cleardata();
    this.preview = "";
  }
  clearrequiredata() {
    this.headerselect = 'null';
    this.changeid = 'null';
  }
  clearalert() {
    this.requirepage = false;
    this.requirechangeid = false;
    this.requiretextstart = false;
    this.requiretextend = false;
    this.savefail = false;
    this.savesuccess = false;
  }
  cleardata() {
    this.starttext = "";
    this.endtext = "";
    this.preview = "";
  }
  previewdata(event) {
    this.preview = event.target.value;
  }
  async selectchangeid(changeid) {
    this.clearalert();
    this.cleardata();
    this.changeid = changeid;
    if (this.changeid != 'null' && this.headerselect != 'null') {
      const cmsheader = await this.cmsService.selectCmsHeader(this.headerselect,this.changeid);
      this.starttext = cmsheader[0]['startText'];
      this.endtext = cmsheader[0]['endText'];
      this.preview = this.starttext + this.endtext;
    } else {
      if (this.changeid === 'null') {
        this.requirechangeid = true;
      } else {
        this.requirepage = true;
      }
    }
  }
  async selectheader(headerid){
    this.clearalert();
    this.cleardata();
    this.headerselect = headerid;
    this.changeid = this.globalVariable.getRolecode() === 'ADMIN' ? '' : this.changeid;
    if (this.headerselect != 'null' && this.changeid != 'null') {
      const cmsheader = await this.cmsService.selectCmsHeader(this.headerselect,this.changeid);
      this.starttext = cmsheader[0]['startText'];
      this.endtext = cmsheader[0]['endText'];
      this.preview = this.starttext + this.endtext;
      console.log('header(): '+cmsheader[0]['startText']);
    }else {
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
    if(this.headerselect === 'null'){
      this.requirepage =  true;
      return false;
    }
    if(this.starttext === ''){
      this.requiretextstart =  true;
      return false;
    }
    if(this.endtext === ''){
      this.requiretextend =  true;
      return false;
    }
    return true;
  }

  async onSubmit(event: any) {
    console.log('onSubmit() was called.');
    this.clearalert();
    this.starttext = event.target.InputStarttext.value;
    this.endtext = event.target.InputEndtext.value;
    this.changeid = this.globalVariable.getRolecode() === 'ADMIN' ? '' : this.changeid;
    if (this.checkrequiredata() === true) {
      const objData = { 
        project: this.globalVariable.getProject(), 
        changeid: this.changeid,  
        headerid: this.headerselect, 
        vertype: this.globalVariable.getRolecode()=== 'ADMIN' ? 'Master': 'Draft', 
        text1: this.starttext, 
        text2: this.endtext, 
        modifiedby: this.globalVariable.getUsernameen(), 
        modifiedon: new Date()
      };
      this.cmsService.updCmsHeader(JSON.stringify(objData));
      this.savesuccess=true;
      this.clearrequiredata();
      this.cleardata();
    } 

  }
}
