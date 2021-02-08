import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../../services/cms.service';
import { GlobalVariable } from '../../../services/globalvariable.service';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css',
  '../../../../assets/css/material.css',
  '../../../../assets/css/sb-admin-2.min.css',
  '../../../../assets/css/cimb-admin-2.min.css',
  '../../../../assets/vendor/fontawesome-free/css/all.min.css',
  '../../../../assets/vendor/datatables/dataTables.bootstrap4.min.css',
  '../../../../assets/font/font.css']
})
export class ContentComponent implements OnInit {
  lookupcmspagemaster;
  lookupcmsheader;
  lookupcmsfooter;
  lookupcmsbody;
  lookupcmsmenu;
  lookupchangeid;
  show: boolean;
  pageselect;
  changeid;
  vertype;
  pagedesc;
  headerid;
  menuid;
  footerid;
  htitletext;
  htext1;
  hextratext;
  btext1;
  bextratext;
  extrabody;
  requirepage: boolean;
  requirechangeid: boolean;
  requiretext: boolean;
  requiretitle: boolean;
  requireheader: boolean;
  requiremenu: boolean;
  requirefooter: boolean;
  savefail: boolean;
  savesuccess: boolean;
  pageduplicate: boolean;
  preview:string;
  tempvertype:string;
  constructor(
    private cmsService: CmsService
    , private globalVariable: GlobalVariable
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
    console.log('Welcome to cmspagemaster page');
    //this.globalVariable.webAuthorize();
    this.lookupcmspagemaster = this.cmsService.selectCmsMsLookupPageMaster(this.globalVariable.getProject());
    this.lookupcmsheader = this.cmsService.selectCmsMsLookupHeader(this.globalVariable.getProject());
    this.lookupcmsfooter = this.cmsService.selectCmsMsLookupFooter(this.globalVariable.getProject());
    this.lookupcmsmenu = this.cmsService.selectCmsMsLookupMenu(this.globalVariable.getProject());
    this.show = this.globalVariable.getRolecode() === 'ADMIN' ? true : false;
    this.lookupchangeid = this.cmsService.selectCmsLookupChangeID(this.globalVariable.getProject());
    this.vertype = this.globalVariable.getRolecode() === 'ADMIN' ? 'Master' : 'Draft';
    this.clearrequiredata();
    this.clearalert();
    this.cleardata();
    this.preview = '';
  }
  clearrequiredata() {
    this.pageselect = 'null';
    this.changeid = 'null';
  }
  clearalert() {
    console.log('clearalert');
    this.requirepage = false;
    this.requirechangeid = false;
    this.requiretitle = false;
    this.requiretext = false;
    this.requireheader = false;
    this.requiremenu = false;
    this.requirefooter = false;
    this.savefail = false;
    this.savesuccess = false;
    this.pageduplicate = false;
  }
  cleardata() {
    this.vertype = '';
    this.pagedesc = '';
    this.headerid = 'null';
    this.menuid = 'null';
    this.footerid = 'null';
    this.htitletext = '';
    this.htext1 = '';
    this.hextratext = '';
    this.btext1 = '';
    this.bextratext = '';
    this.extrabody = '';
    this.preview = '';
  }

  async selectchangeid(changeidd) {
    this.clearalert();
    this.cleardata();
    this.changeid = changeidd;
    console.log('selectchangeid() was called.' + this.changeid);
    // if (this.changeid != 'null' && this.pageselect != 'null') {
    //   const cmspagemaster = await this.cmsService.selectCmsPageMaster(this.pageselect, this.changeid);
    //   this.vertype = cmspagemaster[0]['verType'];
    //   this.pagedesc = cmspagemaster[0]['pageDesc'];
    //   this.headerid = cmspagemaster[0]['headerID'];
    //   this.menuid = cmspagemaster[0]['menuID'];
    //   this.footerid = cmspagemaster[0]['footerID'];
    //   this.htitletext = cmspagemaster[0]['htitleText'];
    //   this.htext1 = cmspagemaster[0]['hText1'];
    //   this.hextratext = cmspagemaster[0]['hExtratext'];
    //   this.btext1 = cmspagemaster[0]['btext1'];
    //   this.bextratext = cmspagemaster[0]['bExtraText'];
    //   this.preview = this.btext1;
    // } else {
      if (this.changeid === 'null') {
        this.requirechangeid = true;
      } else {
        this.requirepage = true;
      }
    // }
  }
  async selectpage(pageid) {
    console.log('onSubmit() was called.' + this.btext1);
    this.clearalert();
    this.cleardata();
    this.pageselect = pageid;
    this.tempvertype = 'Master';
    this.changeid = this.globalVariable.getRolecode() === 'ADMIN' ? '' : this.changeid;
    if (this.pageselect != 'null' && this.changeid != 'null') {

      const cmscheckpage = await this.cmsService.CheckCmsPageMaster(this.pageselect);
      console.log('cmscheckpage() was called.' + cmscheckpage);
       if(typeof(cmscheckpage[0]) == "undefined"){
          this.tempvertype = 'Master';
          const cmspagemaster = await this.cmsService.selectCmsPageMaster(this.pageselect, this.changeid,this.tempvertype);
          this.vertype = cmspagemaster[0]['verType'];
          this.pagedesc = cmspagemaster[0]['pageDesc'];
          this.headerid = cmspagemaster[0]['headerID'];
          this.menuid = cmspagemaster[0]['menuID'];
          this.footerid = cmspagemaster[0]['footerID'];
          this.htitletext = cmspagemaster[0]['htitleText'];
          this.htext1 = cmspagemaster[0]['hText1'];
          this.hextratext = cmspagemaster[0]['hExtratext'];
          this.btext1 = cmspagemaster[0]['btext1'];
          this.bextratext = cmspagemaster[0]['bExtraText'];
          this.preview = this.btext1;
       }else if(cmscheckpage[0]['headerID'] == this.changeid){
          this.tempvertype = 'Draft';
          const cmspagemaster = await this.cmsService.selectCmsPageMaster(this.pageselect, this.changeid,this.tempvertype);
          this.vertype = cmspagemaster[0]['verType'];
          this.pagedesc = cmspagemaster[0]['pageDesc'];
          this.headerid = cmspagemaster[0]['headerID'];
          this.menuid = cmspagemaster[0]['menuID'];
          this.footerid = cmspagemaster[0]['footerID'];
          this.htitletext = cmspagemaster[0]['htitleText'];
          this.htext1 = cmspagemaster[0]['hText1'];
          this.hextratext = cmspagemaster[0]['hExtratext'];
          this.btext1 = cmspagemaster[0]['btext1'];
          this.bextratext = cmspagemaster[0]['bExtraText'];
          this.preview = this.btext1;
       }else{
          this.pageduplicate = true;
       }

    } else {
      if (this.pageselect === 'null') {
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
    if(this.pageselect === 'null'){
      this.requirepage =  true;
      return false;
    }
    if(this.htitletext === ''){
      this.requiretitle =  true;
      return false;
    }
    if(this.btext1 === '' || this.btext1 === 'null'){
      this.requiretext =  true;
      return false;
    }
    if(this.headerid === 'null'){
      this.requireheader =  true;
      return false;
    }
    if(this.menuid === 'null'){
      this.requiremenu =  true;
      return false;
    }
    if(this.footerid === 'null'){
      this.requirefooter =  true;
      return false;
    }
    return true;
  }

  async onSubmit(event: any) {
    console.log('onSubmit() was called.');
    this.clearalert();
    this.htitletext = event.target.InputTitle.value;
    this.htext1 = event.target.Inputhtext1.value;
    this.hextratext = event.target.InputHextratext.value;
    this.headerid = event.target.InputHeaderid.value;
    this.menuid = event.target.InputMenuid.value;
    this.btext1 = event.target.InputBtext1.value;
    console.log('onSubmit() was called.' + this.btext1);
    this.footerid = event.target.Inputfooterid.value;
    this.extrabody = event.target.Inputextrabody.value;
    this.changeid = this.globalVariable.getRolecode() === 'ADMIN' ? '' : this.changeid;
    if (this.checkrequiredata() === true) {
      const objData = {
        project: this.globalVariable.getProject(),
        changeid: this.changeid,
        pageid: this.pageselect,
        vertype: this.globalVariable.getRolecode() === 'ADMIN' ? 'Master' : 'Draft',
        texttitle: this.htitletext,
        texth: this.htext1,
        textextra: this.hextratext,
        headerid: this.headerid,
        menuid: this.menuid,
        textbody: this.btext1,
        footerid: this.footerid,
        // extrabody:this.extrabody,
        modifiedby: this.globalVariable.getUsernameen(),
        modifiedon: new Date()
      };
      this.cmsService.updCmsPageMaster(JSON.stringify(objData));
      this.savesuccess = true;
      this.clearrequiredata();
      this.cleardata();

    }
  }
}
