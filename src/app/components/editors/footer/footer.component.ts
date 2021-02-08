import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../../services/cms.service';
import { GlobalVariable } from '../../../services/globalvariable.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css',
  '../../../../assets/css/material.css',
  '../../../../assets/css/sb-admin-2.min.css',
  '../../../../assets/css/cimb-admin-2.min.css',
  '../../../../assets/vendor/fontawesome-free/css/all.min.css',
  '../../../../assets/vendor/datatables/dataTables.bootstrap4.min.css',
  '../../../../assets/font/font.css']
  
})
export class FooterComponent implements OnInit {
  lookupcmsfooter;
  lookupchangeid;
  show:boolean;
  cmsfooter;
  footerselect;
  text1;
  changeid;
  requirepage:boolean;
  requirechangeid:boolean;
  requiretext:boolean;
  savefail:boolean;
  savesuccess:boolean;
  preview:string;

  constructor(
    private cmsService:CmsService
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
    console.log('Welcome to Footer page');
    //this.globalVariable.webAuthorize();
    this.lookupcmsfooter = this.cmsService.selectCmsMsLookupFooter(this.globalVariable.getProject());
    this.show = (this.globalVariable.getRolecode()==='ADMIN') ? true: false; 
    this.lookupchangeid = this.cmsService.selectCmsLookupChangeID(this.globalVariable.getProject());
    this.clearrequiredata();
    this.clearalert();
    this.cleardata();
    this.preview = "";
  }
  clearrequiredata() {
    this.footerselect = 'null';
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
    console.log('selectchangeid: '+changeid +', typepf: '+ typeof changeid);
    if (this.changeid != 'null' && this.footerselect != 'null') {
      const cmsfooter = await this.cmsService.selectCmsFooter(this.footerselect,this.changeid);
      this.text1 = cmsfooter[0]['text1'];
      this.preview = this.text1;
    } else {
      if (this.changeid === 'null') {
        this.requirechangeid = true;
      } else {
        this.requirepage = true;
      }
    }
  }
  async selectfooter(footerid){
    this.clearalert();
    this.cleardata();
    this.footerselect = footerid;
    this.changeid = this.globalVariable.getRolecode() === 'ADMIN' ? '' : this.changeid;
    if (this.footerselect != 'null' && this.changeid != 'null') {
      const cmsfooter = await this.cmsService.selectCmsFooter(this.footerselect,this.changeid);
      this.text1 = cmsfooter[0]['text1'];
      this.preview = this.text1;
    }else {
      if (this.footerselect === 'null') {
        this.requirepage = true;
      } else {
        this.requirechangeid = true;
      }
    }
  }

  checkrequiredata(){
    
    if(this.changeid === 'null'){
      this.requirechangeid =  true;
      return false;
    }
    if(this.footerselect === 'null'){
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
        footerid: this.footerselect, 
        vertype: this.globalVariable.getRolecode()=== 'ADMIN' ? 'Master': 'Draft',  
        text1: this.text1, 
        modifiedby: this.globalVariable.getUsernameen(), 
        modifiedon: new Date()
      };
      this.cmsService.updCmsFooter(JSON.stringify(objData));
      this.savesuccess=true;
      this.clearrequiredata();
      this.cleardata();
    } 

  }
}