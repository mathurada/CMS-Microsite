import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../../services/cms.service';
import { GlobalVariable } from '../../../services/globalvariable.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css',
  '../../../../assets/css/sb-admin-2.min.css',
  '../../../../assets/css/cimb-admin-2.min.css',
  '../../../../assets/vendor/fontawesome-free/css/all.min.css',
  '../../../../assets/vendor/datatables/dataTables.bootstrap4.min.css',
  '../../../../assets/font/font.css']
})
export class LayoutComponent implements OnInit {
  lookupcmspagelayout;
  lookupchangeid;
  show:boolean;
  layoutselect;
  project;
  changeid;
  startText;
  bodyText1;
  bodyText2;
  bodyText3;
  bodyText4;
  bodyText5;
  bodyText6;
  bodyText7;
  bodyText8;
  bodyText9;
  bodyText10;
  endText;
  requirelayout:boolean;
  requirechangeid:boolean;
  requiretextstart:boolean;
  requiretextend:boolean;
  savefail:boolean;
  savesuccess:boolean;
  constructor(
    private cmsService: CmsService
    ,private globalVariable: GlobalVariable
  ) { }
  ngOnInit() {
    console.log('Welcome to Layout page');
    //this.globalVariable.webAuthorize();
    this.project = this.globalVariable.getProject();
    this.lookupcmspagelayout = this.cmsService.selectCmsMsLookupPageLayout(this.project);
    this.show = (this.globalVariable.getRolecode()==='ADMIN') ? true: false; 
    this.lookupchangeid = this.cmsService.selectCmsLookupChangeID(this.project);
    this.clearrequiredata();
    this.clearalert();
    this.cleardata();
  }
  clearrequiredata() {
    this.layoutselect = 'null';
    this.changeid = 'null';
  }
  clearalert() {
    console.log('clearalert');
    this.requirelayout = false;
    this.requirechangeid = false;
    this.requiretextstart = false;
    this.requiretextend = false;
    this.savefail = false;
    this.savesuccess = false;
  }
  cleardata() {
    this.startText='';
    this.bodyText1='';
    this.bodyText2='';
    this.bodyText3='';
    this.bodyText4='';
    this.bodyText5='';
    this.bodyText6='';
    this.bodyText7='';
    this.bodyText8='';
    this.bodyText9='';
    this.bodyText10='';
    this.endText='';
  }
  async selectchangeid(changeid) {
    this.clearalert();
    this.cleardata();
    this.changeid = changeid;
    console.log('selectchangeid: '+changeid +', typepf: '+ typeof changeid);
    if (this.changeid != 'null' && this.layoutselect != 'null') {
      const cmspagelayout = await this.cmsService.selectCmsPageLayout(this.layoutselect,this.changeid);
      this.startText = cmspagelayout[0]['StartText'];
      this.bodyText1 = cmspagelayout[0]['BodyText1'];
      this.bodyText2 = cmspagelayout[0]['BodyText2'];
      this.bodyText3 = cmspagelayout[0]['BodyText3'];
      this.bodyText4 = cmspagelayout[0]['BodyText4'];
      this.bodyText5 = cmspagelayout[0]['BodyText5'];
      this.endText = cmspagelayout[0]['EndText'];
    } else {
      this.requirelayout = this.layoutselect === 'null' ? true:false;
      this.requirechangeid = this.changeid ==='null' ? true:false;
    }
  }
  async selectpageLayout(layout){
    this.clearalert();
    this.cleardata();
    this.layoutselect = layout;
    this.changeid = this.globalVariable.getRolecode() === 'ADMIN' ? '' : this.changeid;
    if ( this.changeid != 'null' && this.layoutselect != 'null') {
      const cmspagelayout = await this.cmsService.selectCmsPageLayout(this.layoutselect,this.changeid);
      this.startText = cmspagelayout[0]['StartText'];
      this.bodyText1 = cmspagelayout[0]['BodyText1'];
      this.bodyText2 = cmspagelayout[0]['BodyText2'];
      this.bodyText3 = cmspagelayout[0]['BodyText3'];
      this.bodyText4 = cmspagelayout[0]['BodyText4'];
      this.bodyText5 = cmspagelayout[0]['BodyText5'];
      this.endText = cmspagelayout[0]['EndText'];
      console.log('header(): '+cmspagelayout[0]['startText']);
    } else {
      this.requirelayout = this.layoutselect === 'null' ? true:false;
      this.requirechangeid = this.changeid ==='null' ? true:false;
    }
  }

  checkrequiredata(){
    
    if(this.changeid === 'null'){
      this.requirechangeid =  true;
      return false;
    }
    if(this.layoutselect === 'null'){
      this.requirelayout =  true;
      return false;
    }
    if(this.startText === ''){
      this.requiretextstart =  true;
      return false;
    }
    if(this.endText === ''){
      this.requiretextend =  true;
      return false;
    }
    return true;
  }

  async onSubmit(event: any) {
    console.log('onSubmit() was called.');
    this.clearalert();
    this.startText = event.target.InputstartText.value;
    this.bodyText1 = event.target.InputbodyText1.value;
    this.bodyText2 = event.target.InputbodyText2.value;
    this.bodyText3 = event.target.InputbodyText3.value;
    this.bodyText4 = event.target.InputbodyText4.value;
    this.bodyText5 = event.target.InputbodyText5.value;
    this.endText = event.target.Inputendtext.value;
    this.changeid = this.globalVariable.getRolecode() === 'ADMIN' ? '' : this.changeid;
    if (this.checkrequiredata() === true) {
      const objData = { 
        project: this.globalVariable.getProject(), 
        changeid: this.changeid,
        layoutid: this.layoutselect, 
        vertype: this.globalVariable.getRolecode()==='ADMIN' ? 'Master': 'Draft' , 
        starttext:this.startText,
        bodytext1:this.bodyText1,
        bodytext2:this.bodyText2,
        bodytext3:this.bodyText3,
        bodytext4:this.bodyText4,
        bodytext5:this.bodyText5,
        endtext: this.endText, 
        modifiedby: this.globalVariable.getUsernameen(), 
        modifiedon: new Date()
      };
      console.log('Admincontent, before call api success');
      this.cmsService.updCmsPageFile(JSON.stringify(objData));
      this.savesuccess=true;
      this.clearrequiredata();
      this.cleardata();
    }  

  }
}
