import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../../services/cms.service';
import { GlobalVariable } from '../../../services/globalvariable.service';
@Component({
  selector: 'app-metatag',
  templateUrl: './metatag.component.html',
  styleUrls: ['./metatag.component.css',
    '../../../../assets/css/sb-admin-2.min.css',
    '../../../../assets/css/cimb-admin-2.min.css',
    '../../../../assets/vendor/fontawesome-free/css/all.min.css',
    '../../../../assets/vendor/datatables/dataTables.bootstrap4.min.css',
    '../../../../assets/font/font.css']
})
export class MetatagComponent implements OnInit {
  lookupcmspagemaster;
  lookupchangeid;
  lookupcmsparamid;
  cmsmetatag;
  show;
  showtable = true;
  project;
  pageselect;
  changeid;
  paramselect;
  attribute1;
  value1;
  attribute2;
  value2;
  updpageselect;
  updchangeid;
  updparamselect;
  updattribute1;
  updvalue1;
  updattribute2;
  updvalue2;
  delpageselect;
  delchangeid;
  delparamid;
  requirepageselect;
  requirechangeid;
  requireparamid;
  requireattribute1;
  requirevalue1;
  savefail;
  savesuccess;
  constructor(
    public cmsService: CmsService
    , private globalVariable: GlobalVariable
  ) { }
  ngOnInit() {
    console.log('Welcome to Metatag page');
    //this.globalVariable.webAuthorize();
    this.project = this.globalVariable.getProject();
    this.lookupcmspagemaster = this.cmsService.selectCmsMsLookupPageMaster(this.project);
    this.show = (this.globalVariable.getRolecode() === 'ADMIN') ? true : false;
    this.lookupchangeid = this.cmsService.selectCmsLookupChangeID(this.project);
    this.lookupcmsparamid = this.cmsService.selectCmsParamid();
    this.clearrequiredata();
    this.clearalert();
    this.cleardata();
  }
  clearrequiredata() {
    this.pageselect = 'null';
    this.changeid = 'null';
  }
  clearalert() {
    console.log('metatag > clearalert');
    this.requirepageselect = false;
    this.requirechangeid = false;
    this.requireparamid = false;
    this.requireattribute1 = false;
    this.requirevalue1 = false;
    this.savefail = false;
    this.savesuccess = false;
  }
  cleardata() {
    this.paramselect = 'null';
    this.attribute1 = '';
    this.value1 = '';
    this.attribute2 = '';
    this.value2 = '';
    this.updpageselect = '';
    this.updchangeid = '';
    this.updparamselect = 'null';
    this.updattribute1 = '';
    this.updvalue1 = '';
    this.updattribute2 = '';
    this.updvalue2 = '';
  }
  selectchangeid(changeid) {
    this.clearalert();
    this.changeid = changeid;
    if (this.changeid != 'null' && this.pageselect != 'null') {
    } else {
      this.requirepageselect = this.pageselect === 'null' ? true : false;
      this.requirechangeid = this.changeid === 'null' ? true : false;
    }
  }
  selectpage(page) {
    this.clearalert();
    this.pageselect = page;
    this.showtable = false;
    this.changeid = this.globalVariable.getRolecode() === 'ADMIN' ? '' : this.changeid;
    this.cmsmetatag = this.cmsService.selectCmsMetaTag(this.pageselect, this.changeid);
  }
  // args !sure
  selectparamid(paramid) {
    this.paramselect = paramid;
  }
  onkeyaddfield1(event: any) {
    this.attribute1 = event.target.value;
  }
  onkeyaddfield2(event: any) {
    this.value1 = event.target.value;
  }
  onkeyaddfield3(event: any) {
    this.attribute2 = event.target.value;
  }
  onkeyaddfield4(event: any) {
    this.value2 = event.target.value;
  }
  onkeyupdate(data1, data2, data3, data4, data5, data6) {
    this.updpageselect = data1;
    this.updparamselect = data2;
    this.updattribute1 = data3;
    this.updvalue1 = data4;
    this.updattribute2 = data5;
    this.updvalue2 = data6;
    console.log(
      'metatage > onkeyupdate() updpageselect=' + this.updpageselect
      + ', updparamselect=' + this.updparamselect
      + ', updattribute1=' + this.updattribute1
      + ', updvalue1=' + this.updvalue1
      + ', updattribute2=' + this.updattribute2
      + ', updvalue2=' + this.updvalue2
    );
  }
  
  onkeyupdatefield1(event: any) {
    this.updchangeid = event.target.value;
  }
  onkeyupdatefield2(data) {
    this.updparamselect = data;
  }
  onkeyupdatefield3(event: any) {
    this.updattribute1 = event.target.value;
  }
  onkeyupdatefield4(event: any) {
    this.updvalue1 = event.target.value;
  }
  onkeyupdatefield5(event: any) {
    this.updattribute2 = event.target.value;
  }
  onkeyupdatefield6(event: any) {
    this.updvalue2 = event.target.value;
  }
  clear() {
    console.log('clear()');;
    this.reloadselectCmsOccupation();
  }
  async add() {
    this.clearalert();
    this.changeid = this.globalVariable.getRolecode() === 'ADMIN' ? '' : this.changeid;
    console.log(
      'metatage > add(): page=' + this.pageselect
      + ', changeid=' + this.changeid
      + ', paramid=' + this.paramselect
      + ', attribute1=' + this.attribute1
      + ', value1=' + this.value1
      + ', attribute2=' + this.attribute2
      + ', value2=' + this.value2
    );
    if (this.pageselect != 'null' && this.changeid != 'null') {
      const objData = {
        project: this.project,
        pageid: this.pageselect,
        paramid: this.delparamid,
        verType: (this.globalVariable.getRolecode() === 'ADMIN') ? 'Master' : 'Draft',
        changeid: this.changeid,
        attribute1: this.attribute1,
        value1: this.value1,
        attribute2: this.attribute2,
        value2: this.value2,
        modifiedby: this.globalVariable.getUsernameen(),
        modifiedon: new Date()
      };
      this.cmsService.updCmsMetaTag(JSON.stringify(objData));
      this.savesuccess = true;
      this.clearrequiredata();
      this.cleardata();
    } else {
      console.log('metatag > onsubmit() else');
      this.savefail = true;
      this.requirepageselect = this.pageselect === 'null' ? true : false;
      this.requirechangeid = this.changeid === 'null' ? true : false;
      this.requireparamid = this.paramselect === 'null' ? true : false;
      this.requireattribute1 = this.attribute1 === '' ? true : false;
      this.requirevalue1 = this.value1 === '' ? true : false;
    }
  }
  async reloadselectCmsOccupation() {
    this.cmsmetatag = this.cmsService.selectCmsMetaTag(this.pageselect, this.changeid);
    this.cmsmetatag = this.cmsService.selectCmsMetaTag(this.pageselect, this.changeid);
  }
  async update() {
    this.clearalert();
    this.updchangeid = this.globalVariable.getRolecode() === 'ADMIN' ? '' : this.changeid;
    console.log(
      'metatage > add(): updpage=' + this.updpageselect
      + ', updchangeid=' + this.updchangeid
      + ', updparamid=' + this.updparamselect
      + ', updattribute1=' + this.updattribute1
      + ', updvalue1=' + this.updvalue1
      + ', updattribute2=' + this.updattribute2
      + ', updvalue2=' + this.updvalue2
    );
    if (this.updchangeid != 'null' && this.updpageselect != 'null') {
      const objData = {
        project: this.project,
        pageid: this.updpageselect,
        paramid: this.updparamselect,
        verType: (this.globalVariable.getRolecode() === 'ADMIN') ? 'Master' : 'Draft',
        changeid: this.updchangeid,
        attribute1: this.updattribute1,
        value1: this.updvalue1,
        attribute2: this.updattribute2,
        value2: this.updvalue2,
        modifiedby: this.globalVariable.getUsernameen(),
        modifiedon: new Date()
      };
      this.cmsService.updCmsMetaTag(JSON.stringify(objData));
      this.savesuccess = true;
      this.clearrequiredata();
      this.cleardata();
    } else {
      console.log('metatage > onsubmit() else');
      this.savefail = true;
      this.requirepageselect = this.updpageselect === 'null' ? true : false;
      this.requirechangeid = this.updchangeid === 'null' ? true : false;
      this.requireparamid = this.updparamselect === 'null' ? true : false;
      this.requireattribute1 = this.updattribute1 === '' ? true : false;
      this.requirevalue1 = this.updvalue1 === '' ? true : false;
    }
  }
  async delete(data1, data2, data3) {
    this.clearalert();
    this.delpageselect = data1;
    this.delchangeid = data2;
    this.delparamid = data3;
    if (confirm("Are you sure to delete " + this.delpageselect + ', ' + this.delparamid)) {
      const objData = {
        project: this.project,
        pageid: this.delpageselect,
        paramid: this.delparamid,
        verType: (this.globalVariable.getRolecode() === 'ADMIN') ? 'Master' : 'Draft',
        changeid: this.delchangeid,
        attribute1: this.attribute1,
        value1: this.value1,
        attribute2: this.attribute2,
        value2: this.value2,
        modifiedby: this.globalVariable.getUsernameen(),
        modifiedon: new Date(),
        flag: 'D'
      };
      console.log(
        'metatag > delete(): delpageselect=' + this.delpageselect 
        + ', delchangeid=' + this.delchangeid 
        + ', delparamid=' + this.delparamid
      );
      this.cmsService.updCmsMetaTag(JSON.stringify(objData));
      this.savesuccess = true;
      this.cleardata();
      this.reloadselectCmsOccupation();
    }
  }
}
