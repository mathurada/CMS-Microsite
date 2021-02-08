import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../../services/cms.service';
import { GlobalVariable } from '../../../services/globalvariable.service';
@Component({
  selector: 'app-occupation',
  templateUrl: './occupation.component.html',
  styleUrls: ['./occupation.component.css',
    '../../../../assets/css/sb-admin-2.min.css',
    '../../../../assets/css/cimb-admin-2.min.css',
    '../../../../assets/vendor/fontawesome-free/css/all.min.css',
    '../../../../assets/vendor/datatables/dataTables.bootstrap4.min.css',
    '../../../../assets/font/font.css']
})
export class OccupationComponent implements OnInit {
  cmsoccupation;
  occid;
  updoccid;
  deloccid;
  thname;
  orderno;
  updthname;
  updorderno;
  requirethname;
  requireorderno;
  savefail;
  savesuccess;
  showwindowpopup;
  constructor(
    private cmsService: CmsService
    , private globalVariable: GlobalVariable
  ) { }
  ngOnInit() {
    console.log('Welcome to Occupation page');
    //this.globalVariable.webAuthorize();
    this.reloadselectCmsOccupation();
    this.clearrequire();
    this.clearalert();
    this.cleardata();
  }
  clearrequire() {
    this.showwindowpopup = false;
  }
  clearalert() {
    console.log('occupation > clearalert');
    this.requirethname = false;
    this.requireorderno = false;
    this.savefail = false;
    this.savesuccess = false;
  }
  cleardata() {
    this.occid = '0';
    this.thname = '';
    this.orderno = '';
    this.updoccid = '';
    this.updthname = '';
    this.updorderno = '';
    this.deloccid = '';
  }
  onkeyaddfield1(event: any) {
    this.thname = event.target.value;
  }
  onkeyaddfield2(event: any) {
    this.orderno = event.target.value;
  }
  onkeyupdate(data1, data2, data3) {
    this.updoccid = data1;
    this.updthname = data2;
    this.updorderno = data3;
    console.log(
      'occupation > onkeyupdate(): occid=' + this.updoccid 
      + ', updthname=' + this.updthname 
      + ', updorderno=' + this.updorderno
    );
  }
  onkeyupdatefield1(event: any) {
    this.updthname = event.target.value;
  }
  onkeyupdatefield2(event: any) {
    this.updorderno = event.target.value;
  }
  clear() {
    console.log('clear()');;
    this.reloadselectCmsOccupation();
  }
  async add() {
    console.log(
      'occupation > add(): thaname: ' + this.thname 
      + ', occid=' + this.occid 
      + ', orderno=' + this.orderno
    );
    this.clearalert();
    if (this.thname != '' && this.orderno != '') {
      const objData = {
        occid: this.occid,
        rrcsid: '999',
        thname: this.thname,
        itemflag: '1',
        modifiedby: this.globalVariable.getUsernameen(),
        modifiedon: new Date(),
        orderno: this.orderno,
        occmcs: this.occid,
        flag: 'I'
      };
      this.cmsService.updCmsOccupation(JSON.stringify(objData));
      this.savesuccess = true;
      this.cleardata();
      this.reloadselectCmsOccupation();
    } else {
      console.log('occupation > add() else');
      this.savefail = true;
      this.requirethname = this.thname === '' ? true : false;
      this.requireorderno = this.orderno === '' ? true : false;
    }
  }
  async reloadselectCmsOccupation() {
    this.cmsoccupation = this.cmsService.selectCmsOccupation().toPromise();
    this.cmsoccupation = this.cmsService.selectCmsOccupation().toPromise();
  }

  async update() {
    console.log(
      'occupation > update(): updoccid=' + this.updoccid 
      + 'updthaname: ' + this.updthname 
      + ', updorderno=' + this.updorderno
    );
    this.clearalert();
    if (this.updoccid != '' && this.updthname != '' && this.updorderno != '') {
      const objData = {
        occid: this.updoccid,
        rrcsid: '999',
        thname: this.updthname,
        itemflag: '1',
        modifiedby: this.globalVariable.getUsernameen(),
        modifiedon: new Date(),
        orderno: this.updorderno,
        occmcs: this.updoccid,
        flag: 'U'
      };
      this.cmsService.updCmsOccupation(JSON.stringify(objData));
      this.savesuccess = true;
      this.cleardata();
      this.reloadselectCmsOccupation();
    } else {
      console.log('occupation>update() else');
      this.savefail = true;
      this.requirethname = this.updthname === '' ? true : false;
      this.requireorderno = this.updorderno === '' ? true : false;
    }
  }
  async delete(data) {
    this.clearalert();
    this.deloccid = data;
    if (confirm("Are you sure to delete " + this.deloccid )) {
      const objData = {
        occid: this.deloccid,
        rrcsid: '',
        thname: '',
        itemflag: '',
        modifiedby: '',
        modifiedon: '',
        orderno: '',
        occmcs: '',
        flag: 'D'
      };
      console.log('occupation > delete(): occid=' + this.occid);
      this.cmsService.updCmsOccupation(JSON.stringify(objData));
      this.savesuccess = true;
      this.cleardata();
      this.reloadselectCmsOccupation();
    }
  }
}
