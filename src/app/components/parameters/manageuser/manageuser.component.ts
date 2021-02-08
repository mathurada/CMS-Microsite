import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../../services/cms.service'
import { GlobalVariable } from '../../../services/globalvariable.service';
@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.css',
    '../../../../assets/css/sb-admin-2.min.css',
    '../../../../assets/css/cimb-admin-2.min.css',
    '../../../../assets/vendor/fontawesome-free/css/all.min.css',
    '../../../../assets/vendor/datatables/dataTables.bootstrap4.min.css',
    '../../../../assets/font/font.css']
})
export class ManageuserComponent implements OnInit {
  lookupcmsproject;
  lookupcmsrole;
  cmsmanageuser;
  showtable;
  showupdrole 
  project;
  projectselect;
  usercode;
  password;
  thname;
  enname;
  roleselect;
  updprojectselect;
  updusercode;
  updpassword;
  updthname;
  updenname;
  updroleselect;
  delprojectselect;
  delusercode;
  delrolecode;
  requireproject;
  requireusercode;
  requirepassword;
  requirethname;
  requireenname;
  requirerole;
  savefail;
  savesuccess;
  constructor(
    private cmsService: CmsService
    , private globalVariable: GlobalVariable
  ) { }
  ngOnInit() {
    console.log('Welcome to manageuser page');
    //this.globalVariable.webAuthorize();
    this.project = this.globalVariable.getProject();
    this.lookupcmsproject = this.cmsService.selectCmsLookupProject(this.project);
    this.lookupcmsrole = this.cmsService.selectCmsLookupRole(this.project);
    this.clearrequiredata();
    this.clearalert();
    this.cleardata();
  }
  clearrequiredata() {
    this.projectselect = 'null';
  }
  clearalert() {
    console.log('manageuser > clearalert');
    this.requireproject = false;
    this.requireusercode = false;
    this.requirepassword = false;
    this.requirethname = false;
    this.requireenname = false;
    this.requirerole = false;
    this.savefail = false;
    this.savesuccess = false;
  }
  cleardata() {
    this.projectselect = 'null';
    this.usercode = '';
    this.password = '';
    this.thname = '';
    this.enname = '';
    this.roleselect = 'null';
    this.updprojectselect = '';
    this.updusercode = '';
    this.updpassword = '';
    this.updthname = '';
    this.updenname = '';
    this.updroleselect = '';
    this.delprojectselect = '';
    this.delusercode = '';
    this.delrolecode = '';
    this.showtable = true;
    this.showupdrole = false;
  }
  onkeyaddfield1(page) {
    this.clearalert();
    this.projectselect = page;
    this.showtable = false;
    this.reloadselectUpdCmsManageUser(this.projectselect);
  }
  onkeyaddfield2(event: any) {
    this.usercode = event.target.value;
  }
  onkeyaddfield3(event: any) {
    this.password = event.target.value;
  }
  onkeyaddfield4(event: any) {
    this.thname = event.target.value;
  }
  onkeyaddfield5(event: any) {
    this.enname = event.target.value;
  }
  onkeyaddfield6(role) {
    this.clearalert();
    this.roleselect = role;
  }
  onkeyupdate(data1, data2, data3, data4, data5, data6) {
    this.updprojectselect = data1;  // require field
    this.updusercode = data2;       // require field
    this.updpassword = data3
    this.updthname = data4;
    this.updenname = data5;
    this.updroleselect = data6;
    this.showupdrole = true;
    console.log(
      'manageuser > onkeyupdate(): updprojectselect=' + this.updprojectselect
      + ', upduser=' + this.updusercode
      + ', updpassword=' + this.updpassword
      + ', updthname=' + this.updthname
      + ', updenname=' + this.updenname
      + ', updroleselect=' + this.updroleselect
    );
  }
  onkeyupdatefield1(event: any) {
    this.updpassword = event.target.value;
  }
  onkeyupdatefield2(event: any) {
    this.updthname = event.target.value;
  }
  onkeyupdatefield3(event: any) {
    this.updenname = event.target.value;
  }
  onkeyupdatefield4(role) {
    this.clearalert();
    this.updroleselect = role;
  }
  clear() {
    console.log('clear()');
    this.reloadselectUpdCmsManageUser(this.projectselect);
  }
  async add() {
    console.log(
      'manageuser > add(): projectselect=' + this.projectselect
      + ', usercode=' + this.usercode
      + ', password=' + this.password
      + ', thname= ' + this.thname
      + ', enname=' + this.enname
      + ', roleselect=' + this.roleselect
    );
    this.clearalert();
    if (
      this.projectselect != 'null'
      && this.usercode != ''
      && this.password != ''
      && this.thname != ''
      && this.enname != ''
      && this.roleselect != 'null'
    ) {
      const objData = {
        project: this.projectselect,
        usercode: this.usercode,
        passcode: this.password,
        usernameth: this.thname,
        usernameen: this.enname,
        rolecode: this.roleselect,
        modifiedby: this.globalVariable.getUsernameen(),
        modifiedon: new Date(),
        flag: "I"
      };
      this.cmsService.updCmsManageUser(JSON.stringify(objData));
      this.savesuccess = true;
      this.clearrequiredata();
      this.cleardata();
      this.reloadselectUpdCmsManageUser(this.projectselect);
    } else {
      console.log('city > add() else');
      this.savefail = true;
      this.requireproject = this.projectselect === 'null' ? true : false;
      this.requireusercode = this.usercode === '' ? true : false;
      this.requirepassword = this.password === '' ? true : false;
      this.requirethname = this.thname === '' ? true : false;
      this.requireenname = this.enname === '' ? true : false;
      this.requirerole = this.roleselect === 'null' ? true : false;
    }
  }
  async reloadselectUpdCmsManageUser(projectselect) {
    this.cmsmanageuser = this.cmsService.selectCmsTableManageUser(projectselect);
    this.cmsmanageuser = this.cmsService.selectCmsTableManageUser(projectselect);
  }
  async update() {
    console.log(
      'manageuser > update(): updprojectselect=' + this.updprojectselect
      + ', usercode=' + this.updusercode
      + ', updpassword=' + this.updpassword
      + ', updthname= ' + this.updthname
      + ', updenname=' + this.updenname
      + ', updroleselect=' + this.updroleselect
    );
    this.clearalert();
    if (
      this.updprojectselect != 'null'
      && this.updusercode != ''
      && this.updpassword != ''
      && this.updthname != ''
      && this.updenname != ''
      && this.updroleselect != 'null'
    ) {
      const objData = {
        project: this.updprojectselect,
        usercode: this.updusercode,
        passcode: this.updpassword,
        usernameth: this.updthname,
        usernameen: this.updenname,
        rolecode: this.updroleselect,
        modifiedby: this.globalVariable.getUsernameen(),
        modifiedon: new Date(),
        flag: "U"
      };
      this.cmsService.updCmsManageUser(JSON.stringify(objData));
      this.savesuccess = true;
      this.clearrequiredata();
      this.cleardata();
      this.reloadselectUpdCmsManageUser(this.projectselect);
    } else {
      console.log('manageuser > update() else');
      this.savefail = true;
      this.requireproject = this.updprojectselect === 'null' ? true : false;
      this.requireusercode = this.updusercode === '' ? true : false;
      this.requirepassword = this.updpassword === '' ? true : false;
      this.requirethname = this.updthname === '' ? true : false;
      this.requireenname = this.updenname === '' ? true : false;
      this.requirerole = this.updroleselect === 'null' ? true : false;
    }
  }
  async delete(data1, data2,data3) {
    this.clearalert();
    this.delprojectselect = data1;
    this.delusercode = data2;
    this.delrolecode = data3;
    if (confirm("Are you sure to delete " + this.delprojectselect + ', ' + this.delusercode)) {
      const objData = {
        project: this.delprojectselect,
        usercode: this.delusercode,
        passcode: '',
        usernameth: '',
        usernameen: '',
        rolecode: this.delrolecode,
        modifiedby: this.globalVariable.getUsernameen(),
        modifiedon: new Date(),
        flag: "D"
      };
      console.log('manageuser > delete(): delprojectselect=' + this.delprojectselect + ', ' + this.delusercode);
      this.cmsService.updCmsManageUser(JSON.stringify(objData));
      this.savesuccess = true;
      this.clearrequiredata();
      this.cleardata();
      this.reloadselectUpdCmsManageUser(this.projectselect);
    }
  }
}
