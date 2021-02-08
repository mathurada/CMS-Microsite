import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../../services/cms.service';
import { GlobalVariable } from '../../../services/globalvariable.service';
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css',
    '../../../../assets/css/sb-admin-2.min.css',
    '../../../../assets/css/cimb-admin-2.min.css',
    '../../../../assets/vendor/fontawesome-free/css/all.min.css',
    '../../../../assets/vendor/datatables/dataTables.bootstrap4.min.css',
    '../../../../assets/font/font.css']
})
export class CityComponent implements OnInit {
  cmscity;
  project;
  citycode;
  thname;
  enname;
  updcitycode;
  updthname;
  updenname;
  delcitycode;
  requirecitycode;
  requirethname;
  requireenname;
  savefail;
  savesuccess;
  constructor(
    private cmsService: CmsService
    , private globalVariable: GlobalVariable
  ) { }
  ngOnInit() {
    console.log('Welcome to city page');
    //this.globalVariable.webAuthorize();
    this.project = this.globalVariable.getProject();
    this.reloadselectCmsCity();
    this.clearrequire();
    this.clearalert();
    this.cleardata();
  }
  clearrequire() {
  }
  clearalert() {
    console.log('city > clearalert');
    this.requirecitycode = false;
    this.requirethname = false;
    this.requireenname = false;
    this.savefail = false;
    this.savesuccess = false;
  }
  cleardata() {
    this.citycode = '';
    this.thname = '';
    this.enname = '';
    this.updcitycode = '';
    this.updthname = '';
    this.updenname = '';
    this.delcitycode = '';
  }
  onkeyaddfield1(event: any) {
    this.citycode = event.target.value;
  }
  onkeyaddfield2(event: any) {
    this.thname = event.target.value;
  }
  onkeyaddfield3(event: any) {
    this.enname = event.target.value;
  }
  onkeyupdate(data1, data2, data3) {
    this.updcitycode = data1;
    this.updthname = data2;
    this.updenname = data3;
    console.log(
      'city > onkeyupdate(): updcitycode=' + this.updcitycode 
      + ', updthname=' + this.updthname 
      + ', updenname=' + this.updenname
    );
  }
  onkeyupdatefield1(event: any) {
    this.updthname = event.target.value;
  }
  onkeyupdatefield2(event: any) {
    this.updenname = event.target.value;
  }
  clear() {
    console.log('clear()');
    this.reloadselectCmsCity();
  }
  async add() {
    console.log(
      'city>add(): citycode=' + this.citycode 
      + ', thaname: ' + this.thname 
      + ', enname=' + this.enname
    );
    this.clearalert();
    if (this.citycode != '' && this.thname != '' && this.enname != '') {
      const objData = {
        cityid: this.citycode,
        thname: this.thname,
        enname: this.enname,
        uoddttm: '',
        modifiedby: this.globalVariable.getUsernameen(),
        modifiedon: new Date(),
        orderno: '',
        flag: 'I'
      };
      this.cmsService.updCmsCity(JSON.stringify(objData));
      this.savesuccess = true;
      this.cleardata();
      this.reloadselectCmsCity();
    } else {
      console.log('city > add() else');
      this.savefail = true;
      this.requirecitycode = this.citycode === '' ? true : false;
      this.requirethname = this.thname === '' ? true : false;
      this.requireenname = this.enname === '' ? true : false;
    }
  }
  async reloadselectCmsCity() {
    this.cmscity = this.cmsService.selectCmsCity().toPromise();
    this.cmscity = this.cmsService.selectCmsCity().toPromise();
  }
  async update() {
    console.log(
      'city > add(): updcitycode=' + this.updcitycode 
      + ', updthaname: ' + this.updthname 
      + ', updenname=' + this.updenname
    );
    this.clearalert();
    if (this.updcitycode != '' && this.updthname != '' && this.updenname != '') {
      const objData = {
        cityid: this.updcitycode,
        thname: this.updthname,
        enname: this.updenname,
        uoddttm: '',
        modifiedby: this.globalVariable.getUsernameen(),
        modifiedon: new Date(),
        orderno: '',
        flag: 'U'
      };
      this.cmsService.updCmsCity(JSON.stringify(objData));
      this.savesuccess = true;
      this.cleardata();
      this.reloadselectCmsCity();
    } else {
      console.log('city>update() else');
      this.savefail = true;
      this.requirecitycode = this.updcitycode === '' ? true : false;
      this.requirethname = this.updthname === '' ? true : false;
      this.requireenname = this.updenname === '' ? true : false;
    }
  }
  async delete(data) {
    this.clearalert();
    this.delcitycode = data;
    if (confirm("Are you sure to delete " + this.delcitycode )) {
      const objData = {
        cityid: this.delcitycode,
        thname: '',
        enname: '',
        uoddttm: '',
        modifiedby: this.globalVariable.getUsernameen(),
        modifiedon: new Date(),
        orderno: '',
        flag: 'D'
      };
      console.log('city > delete(): delcitycode=' + this.delcitycode);
      this.cmsService.updCmsCity(JSON.stringify(objData));
      this.savesuccess = true;
      this.cleardata();
      this.reloadselectCmsCity();
    }
  }
}
