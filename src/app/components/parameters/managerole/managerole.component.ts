import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../../services/cms.service'
import { GlobalVariable } from '../../../services/globalvariable.service';
@Component({
  selector: 'app-managerole',
  templateUrl: './managerole.component.html',
  styleUrls: ['./managerole.component.css',
  '../../../../assets/css/sb-admin-2.min.css',
  '../../../../assets/css/cimb-admin-2.min.css',
  '../../../../assets/vendor/fontawesome-free/css/all.min.css',
  '../../../../assets/vendor/datatables/dataTables.bootstrap4.min.css',
  '../../../../assets/font/font.css']
})
export class ManageroleComponent implements OnInit {
  lookupcmsproject;
  cmsmanagerole;
  showtable;
  project;
  projectselect;
  rolecode;
  rolelevel;
  thname;
  enname;
  updprojectselect;
  updrolecode;
  updrolelevel;
  updthname;
  updenname;
  delprojectselect;
  delrolecode;
  requireproject;
  requirerolecode;
  requirerolelevel;
  requirethname;
  requireenname;
  savefail;
  savesuccess;
  constructor(
    private cmsService:CmsService
    ,private globalVariable:GlobalVariable
  ) { }
  ngOnInit() {
    console.log('Welcome to managerole page');
    //this.globalVariable.webAuthorize();
    this.project = this.globalVariable.getProject();
    this.lookupcmsproject = this.cmsService.selectCmsLookupProject(this.project);
    this.clearrequiredata();
    this.clearalert();
    this.cleardata();
  }
  clearrequiredata() {
    this.projectselect = 'null';
  }
  clearalert() {
    console.log('managerole > clearalert');
    this.requireproject = false;
    this.requirerolecode = false;
    this.requirerolelevel = false;
    this.requirethname=false;
    this.requireenname=false;
    this.savefail = false;
    this.savesuccess = false;
  }
  cleardata() {
    this.projectselect = 'null';
    this.rolecode='';
    this.rolelevel='';
    this.thname='';
    this.enname='';
    this.updprojectselect = '';
    this.updrolecode='';
    this.updrolelevel='';
    this.updthname='';
    this.updenname='';
    this.delprojectselect = '';
    this.delrolecode = '';
    this.showtable = true;
  }
  onkeyaddfield1(page) {
    this.clearalert();
    this.projectselect = page;
    this.showtable = false;
    this.reloadselectUpdCmsManageRole(this.projectselect);
  }
  onkeyaddfield2(event: any) {
    this.rolecode = event.target.value;
  }
  onkeyaddfield3(event: any) {
    this.rolelevel = event.target.value;
  }
  onkeyaddfield4(event: any) {
    this.thname = event.target.value;
  }
  onkeyaddfield5(event: any) {
    this.enname = event.target.value;
  }
  onkeyupdate(data1, data2, data3, data4, data5) {
    this.updprojectselect = data1;  // require field
    this.updrolecode = data2;       // require field
    this.updrolelevel = data3
    this.updthname = data4;
    this.updenname = data5;
    console.log(
      'managerole > onkeyupdate(): updprojectselect=' + this.updprojectselect
      + ', updrolecode=' + this.updrolecode
      + ', updrolelevel=' + this.updrolelevel
      + ', updthname=' + this.updthname
      + ', updenname=' + this.updenname
    );
  }
  onkeyupdatefield1(event: any) {
    this.updrolelevel = event.target.value;
  }
  onkeyupdatefield2(event: any) {
    this.updthname = event.target.value;
  }
  onkeyupdatefield3(event: any) {
    this.updenname = event.target.value;
  }
  clear() {
    console.log('clear()');
    this.reloadselectUpdCmsManageRole(this.projectselect);
  }
  
  async add() {
    console.log(
      'managerole > add(): projectselect=' + this.projectselect
      + ', rolecode=' + this.rolecode
      + ', rolelevel=' + this.rolelevel
      + ', thname= ' + this.thname
      + ', enname=' + this.enname
    );
    this.clearalert();
    if(this.projectselect != 'null' && 
      this.rolecode!='' && 
      this.rolelevel!=''&& 
      this.thname!='' &&
      this.enname!=''
    ){
      const objData = { 
        project: this.projectselect, 
        rolecode: this.rolecode,
        rolelevel:this.rolelevel,
        rolenameth: this.thname,
        rolenameen: this.enname,
        modifiedby: this.globalVariable.getUsernameen(), 
        modifiedon: new Date(),
        flag: "I"
      };
      this.cmsService.updCmsManageRole(JSON.stringify(objData));
      this.savesuccess=true;
      this.clearrequiredata();
      this.cleardata();
      this.reloadselectUpdCmsManageRole(this.projectselect);
    } else {
      console.log('managerole > add() else');
      this.savefail=true;
      this.requireproject = this.projectselect===''?true:false;
      this.requirerolecode = this.rolecode===''?true:false;
      this.requirerolelevel = this.rolelevel===''?true:false;
      this.requirethname = this.thname ===''?true:false;
      this.requireenname = this.enname ===''?true:false;
    }
  }
  
  async reloadselectUpdCmsManageRole(projectselect) {
    this.cmsmanagerole = this.cmsService.selectCmsTableManageRole(projectselect);
    this.cmsmanagerole = this.cmsService.selectCmsTableManageRole(projectselect);
  }
  async update() {
    console.log(
      'manageuser > update(): updprojectselect=' + this.updprojectselect
      + ', updrolecode=' + this.updrolecode
      + ', updrolelevel=' + this.updrolelevel
      + ', updthname= ' + this.updthname
      + ', updenname=' + this.updenname
    );
    this.clearalert();
    if (
      this.updprojectselect != 'null'
      && this.updrolecode != ''
      && this.updrolelevel != ''
      && this.updthname != ''
      && this.updenname != ''
    ) {
      const objData = {
        project: this.updprojectselect, 
        rolecode: this.updrolecode,
        rolelevel:this.updrolelevel,
        rolenameth: this.updthname,
        rolenameen: this.updenname,
        modifiedby: this.globalVariable.getUsernameen(), 
        modifiedon: new Date(),
        flag: "U"
      };
      this.cmsService.updCmsManageRole(JSON.stringify(objData));
      this.savesuccess = true;
      this.clearrequiredata();
      this.cleardata();
      this.reloadselectUpdCmsManageRole(this.projectselect);
    } else {
      console.log('managerole> update() else');
      this.savefail = true;
      this.requireproject = this.updprojectselect === 'null' ? true : false;
      this.requirerolecode = this.updrolecode === '' ? true : false;
      this.requirerolelevel = this.updrolelevel === '' ? true : false;
      this.requirethname = this.updthname === '' ? true : false;
      this.requireenname = this.updenname === '' ? true : false;
    }
  }
  async delete(data1, data2) {
    this.clearalert();
    this.delprojectselect = data1;
    this.delrolecode = data2;
    if (confirm("Are you sure to delete " + this.delprojectselect + ', ' + this.delrolecode)) {
      const objData = {
        project: this.delprojectselect, 
        rolecode: this.delrolecode,
        rolelevel:"",
        rolenameth: "",
        rolenameen: "",
        modifiedby: this.globalVariable.getUsernameen(), 
        modifiedon: new Date(),
        flag: "D"
      };
      console.log('managerole> delete(): delprojectselect=' + this.delprojectselect + ', ' + this.delrolecode);
      this.cmsService.updCmsManageRole(JSON.stringify(objData));
      this.savesuccess = true;
      this.clearrequiredata();
      this.cleardata();
      this.reloadselectUpdCmsManageRole(this.projectselect);
    }
  }
}
