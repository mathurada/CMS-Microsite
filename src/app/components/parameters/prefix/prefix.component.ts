import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../../services/cms.service';
import { GlobalVariable } from '../../../services/globalvariable.service';
@Component({
  selector: 'app-prefix',
  templateUrl: './prefix.component.html',
  styleUrls: ['./prefix.component.css',
    '../../../../assets/css/sb-admin-2.min.css',
    '../../../../assets/css/cimb-admin-2.min.css',
    '../../../../assets/vendor/fontawesome-free/css/all.min.css',
    '../../../../assets/vendor/datatables/dataTables.bootstrap4.min.css',
    '../../../../assets/font/font.css']
})
export class PrefixComponent implements OnInit {
  cmsprefix;
  prefixcode;
  shname;
  thname;
  enname;
  gender;
  updprefixcode;
  updshname;
  updthname;
  updenname;
  updgender;
  delprefixcode;
  requireprefixcode;
  requireshname;
  requirethname;
  requireenname;
  requiregender;
  savefail;
  savesuccess;
  showupdmale;
  showupdfemale;
  constructor(
    private cmsService: CmsService
    , private globalVariable: GlobalVariable
  ) { }
  ngOnInit() {
    console.log('Welcome to Prefix page');
    //this.globalVariable.webAuthorize();
    this.reloadselectCmsPrefix();
    this.clearrequiredata();
    this.clearalert();
    this.cleardata();
  }
  clearrequiredata() {
  }
  clearalert() {
    console.log('prefix > clearalert');
    this.requireprefixcode = false;
    this.requireshname = false;
    this.requirethname = false;
    this.requireenname = false;
    this.requiregender = false;
    this.savefail = false;
    this.savesuccess = false;
    this.showupdmale=false;
    this.showupdfemale=false;
  }
  cleardata() {
    this.prefixcode = '';
    this.shname = '';
    this.thname = '';
    this.enname = '';
    this.gender = 'null';
    this.updprefixcode = '';
    this.updshname = '';
    this.updthname = '';
    this.updenname = '';
    this.updgender = 'null';
    this.delprefixcode = '';
  }
  onkeyaddfield1(event: any) {
    this.prefixcode = event.target.value;
  }
  onkeyaddfield2(event: any) {
    this.shname = event.target.value;
  }
  onkeyaddfield3(event: any) {
    this.thname = event.target.value;
  }
  onkeyaddfield4(event: any) {
    this.enname = event.target.value;
  }
  onkeyaddfield5(gender) {
    this.gender = gender;
  }
  onkeyupdate(data1, data2, data3, data4, data5) {
    this.updprefixcode = data1;
    this.updshname = data2;
    this.updthname = data3;
    this.updenname = data4;
    this.updgender = data5;
    this.showupdmale = this.updgender === 'M' ? true: false;
    this.showupdfemale = this.updgender === 'F' ? true: false;
    console.log(
      'prefix > onkeyupdate(): updprefixcode=' + this.updprefixcode
      + ', updshname=' + this.updshname
      + ', updthname=' + this.updthname
      + ', updenname=' + this.updenname
      + ', updgender=' + this.updgender
    );
  }
  onkeyupdatefield1(event: any) {
    this.updshname = event.target.value;
  }
  onkeyupdatefield2(event: any) {
    this.updthname = event.target.value;
  }
  onkeyupdatefield3(event: any) {
    this.updenname = event.target.value;
  }
  onkeyupdatefield4(event: any) {
    this.updgender = event.target.value;
  }
  clear() {
    console.log('prefix > clear()');
    this.reloadselectCmsPrefix();
  }
  async add() {
    console.log(
      'prefix > add(): prefixcode=' + this.prefixcode
      + ', shname=' + this.shname
      + ', thname=' + this.thname
      + ', enname=' + this.enname
      + ', gender=' + this.gender);
    this.clearalert();
    if (this.prefixcode != '' && this.shname != '' && this.thname != '' && this.enname != '' && this.gender != '') {
      const objData = {
        prefixid: this.prefixcode,
        shname: this.shname,
        thname: this.thname,
        enname: this.enname,
        gender: this.gender,
        showin: '',
        titletype: '',
        upddttm: '',
        modifiedby: this.globalVariable.getUsernameen(),
        modifiedon: new Date(),
        orderno: '',
        flag: 'I'
      };
      this.cmsService.updCmsPrefix(JSON.stringify(objData));
      this.savesuccess = true;
      this.cleardata();
      this.reloadselectCmsPrefix();
    } else {
      console.log('prefix > add() else');
      this.savefail = true;
      this.requireprefixcode = this.prefixcode === '' ? true : false;
      this.requireshname = this.shname === '' ? true : false;
      this.requirethname = this.thname === '' ? true : false;
      this.requireenname = this.enname === '' ? true : false;
      this.requiregender = this.gender === '' ? true : false;
    }
  }
  async reloadselectCmsPrefix() {
    this.cmsprefix = this.cmsService.selectCmsPrefix().toPromise();
    this.cmsprefix = this.cmsService.selectCmsPrefix().toPromise();
  }
  async update() {
    console.log(
      'prefix > add(): updprefixcode=' + this.updprefixcode
      + ', updshname=' + this.updshname
      + ', updthname=' + this.updthname
      + ', updenname=' + this.updenname
      + ', updgender=' + this.updgender
    );
    this.clearalert();
    if (this.updprefixcode != '' && this.updshname != '' && this.updthname != '' && this.updenname != '' && this.updgender != '') {
      const objData = {
        prefixid: this.updprefixcode,
        shname: this.updshname,
        thname: this.updthname,
        enname: this.updenname,
        gender: this.updgender,
        showin: '',
        titletype: '',
        upddttm: '',
        modifiedby: this.globalVariable.getUsernameen(),
        modifiedon: new Date(),
        orderno: '',
        flag: 'U'
      };
      this.cmsService.updCmsPrefix(JSON.stringify(objData));
      this.savesuccess = true;
      this.cleardata();
      this.reloadselectCmsPrefix();
    } else {
      console.log('prefix > update() else');
      this.savefail = true;
      this.requireprefixcode = this.updprefixcode === '' ? true : false;
      this.requireshname = this.updshname === '' ? true : false;
      this.requirethname = this.updthname === '' ? true : false;
      this.requireenname = this.updenname === '' ? true : false;
      this.requiregender = this.updgender === '' ? true : false;
    }
  }
  async delete(data) {
    this.clearalert();
    this.delprefixcode = data;
    if (confirm("Are you sure to delete " + this.delprefixcode)) {
      const objData = {
        prefixid: this.delprefixcode,
        shname: '',
        thname: '',
        enname: '',
        gender: '',
        showin: '',
        titletype: '',
        upddttm: '',
        modifiedby: this.globalVariable.getUsernameen(),
        modifiedon: new Date(),
        orderno: '',
        flag: 'D'
      };
      console.log('prefix > delete(): delcitycode=' + this.delprefixcode);
      this.cmsService.updCmsPrefix(JSON.stringify(objData));
      this.savesuccess = true;
      this.cleardata();
      this.reloadselectCmsPrefix();
    }
  }
}


