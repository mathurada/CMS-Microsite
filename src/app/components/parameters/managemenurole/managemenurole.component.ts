import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../../services/cms.service'
import { GlobalVariable } from '../../../services/globalvariable.service';
@Component({
  selector: 'app-managemenurole',
  templateUrl: './managemenurole.component.html',
  styleUrls: ['./managemenurole.component.css',
    '../../../../assets/css/sb-admin-2.min.css',
    '../../../../assets/css/cimb-admin-2.min.css',
    '../../../../assets/vendor/fontawesome-free/css/all.min.css',
    '../../../../assets/vendor/datatables/dataTables.bootstrap4.min.css',
    '../../../../assets/font/font.css']
})
export class ManagemenuroleComponent implements OnInit {
  lookupcmsproject;
  lookupcmsrole;
  cmsmanagemenurole;
  showtable;
  project;
  role;
  projectselect;
  roleselect;
  menuid;
  menutype;
  menutext;;
  menuurl;
  remark;
  updprojectselect;
  updroleselect;
  updmenuid;
  updmenutype;
  updmenutext;;
  updmenuurl;
  updremark;
  delprojectselect;
  delroleselect;
  delmenuid;
  delmenutype;
  requireproject;
  requirerole;
  requiremenuid;
  requiremenutype;
  requiremenutext;
  requiremenuurl;
  requireremark;
  savefail;
  savesuccess;
  constructor(
    private cmsService: CmsService
    , private globalVariable: GlobalVariable
  ) { }
  ngOnInit() {
    console.log('Welcome to managemenurole page');
    //this.globalVariable.webAuthorize();
    this.project = this.globalVariable.getProject();
    this.lookupcmsproject = this.cmsService.selectCmsLookupProject(this.project);
    this.lookupcmsrole = this.cmsService.selectCmsLookupRole(this.project);
    this.cmsmanagemenurole = this.cmsService.selectCmsTableManageMenuRole(this.project, this.role);
    this.clearrequiredata();
    this.clearalert();
    this.cleardata();
  }

  clearrequiredata() {
    this.projectselect = 'null';
    this.updprojectselect = '';
    this.delprojectselect = '';
  }
  clearalert() {
    console.log('managemenurole > clearalert() ');
    this.requireproject = false;
    this.requirerole = false;
    this.requiremenuid = false;
    this.requiremenutype = false;
    this.requiremenutext = false;
    this.requiremenuurl = false;
    this.requireremark = false;
    this.savefail = false;
    this.savesuccess = false;
  }
  cleardata() {
    this.menuid = '';
    this.menutype = '';
    this.menutext = '';
    this.menuurl = '';
    this.remark = '';
    this.roleselect = 'null';
    this.updmenuid = '';
    this.updmenutype = '';
    this.updmenutext = '';
    this.updmenuurl = '';
    this.updremark = '';
    this.updroleselect = 'null';
    this.delmenuid = '';
    this.showtable = true;
  }
  onkeyaddfield1(page) {
    this.clearalert();
    this.projectselect = page;
    if (this.projectselect != 'null' && this.roleselect != 'null') {
      this.showtable = false;
      this.reloadselectUpdCmsManageMenuRole(this.projectselect, this.roleselect);
    } else {
      if (this.projectselect === 'null' && this.roleselect === 'null') {
        this.requireproject = true;
        this.requirerole = true;
      } else if (this.projectselect === 'null') {
        this.requireproject = true;
      } else {
        this.requirerole = true;
      }
    }
  }
  onkeyaddfield2(role) {
    this.clearalert();
    this.roleselect = role;
    if (this.projectselect != 'null' && this.roleselect != 'null') {
      this.showtable = false;
      this.reloadselectUpdCmsManageMenuRole(this.projectselect, this.roleselect);
    } else {
      if (this.projectselect === 'null' && this.roleselect === 'null') {
        this.requireproject = true;
        this.requirerole = true;
      } else if (this.projectselect === 'null') {
        this.requireproject = true;
      } else {
        this.requirerole = true;
      }
    }
  }
  onkeyaddfield3(event: any) {
    this.menuid = event.target.value;
  }
  onkeyaddfield4(event: any) {
    this.menutype = event.target.value;
  }
  onkeyaddfield5(event: any) {
    this.menutext = event.target.value;
  }
  onkeyaddfield6(event: any) {
    this.menuurl = event.target.value;
  }
  onkeyaddfield7(event: any) {
    this.remark = event.target.value;
  }
  onkeyupdate(data1, data2, data3, data4, data5, data6, data7) {
    this.updprojectselect = data1;  // require field
    this.updroleselect = data2;     // require field
    this.updmenuid = data3;         // require field
    this.updmenutype = data4;
    this.updmenutext = data5;
    this.updmenuurl = data6;
    this.updremark = data7;
    console.log(
      'managerole > onkeyupdate(): updprojectselect=' + this.updprojectselect
      + ', updroleselect=' + this.roleselect
      + ', updmenuid=' + this.updmenuid
      + ', updmenutype=' + this.updmenutype
      + ', updmenutext=' + this.updmenutext
      + ', updmenuurl=' + this.updmenuurl
      + ', updremark=' + this.updremark
    );
  }
  onkeyupdatefield1(event: any) {
    this.updmenutype = event.target.value;
  }
  onkeyupdatefield2(event: any) {
    this.updmenutext = event.target.value;
  }
  onkeyupdatefield3(event: any) {
    this.updmenuurl = event.target.value;
  }
  onkeyupdatefield4(event: any) {
    this.updremark = event.target.value;
  }
  clear() {
    console.log('clear()');
    this.reloadselectUpdCmsManageMenuRole(this.updprojectselect, this.updroleselect);
  }
  async add() {
    console.log(
      'managemenurole > add(): projectselect=' + this.projectselect
      + ', roleselect=' + this.roleselect
      + ', menuid=' + this.menuid
      + ', menutype= ' + this.menutype
      + ', menutext=' + this.menutext
      + ', menuurl=' + this.menuurl
      + ',remark=' + this.remark
    );
    this.clearalert();
    if (this.projectselect != 'null'
      && this.roleselect != 'null'
      && this.menuid != ''
      && this.menutype != ''
      && this.menutext != ''
      && this.menuurl != ''
      && this.remark != ''
    ) {
      const objData = {
        project: this.projectselect,
        menuid: this.menuid,
        menutype: this.menutype,
        rolecode: this.roleselect,
        menutext: this.menutext,
        menuurl: this.menuurl,
        remark: this.remark,
        modifiedby: this.globalVariable.getUsernameen(),
        modifiedon: new Date(),
        flag: "I"
      };
      this.cmsService.updCmsManageMenuRole(JSON.stringify(objData));
      this.savesuccess = true;
      this.clearrequiredata();
      this.cleardata();
      this.reloadselectUpdCmsManageMenuRole(this.projectselect, this.roleselect);
    } else {
      console.log('managemenurole > add() else');
      this.savefail = true;
      this.requireproject = this.projectselect === '' ? true : false;
      this.requirerole = this.roleselect === '' ? true : false;
      this.requiremenuid = this.menuid === '' ? true : false;
      this.requiremenutype = this.menutype === '' ? true : false;
      this.requiremenutext = this.menutext === '' ? true : false;
      this.requiremenuurl = this.menuurl === '' ? true : false;
      this.requireremark = this.remark === '' ? true : false;
    }
  }
  async reloadselectUpdCmsManageMenuRole(projectselect, roleselect) {
    this.cmsmanagemenurole = this.cmsService.selectCmsTableManageMenuRole(projectselect, roleselect);
    this.cmsmanagemenurole = this.cmsService.selectCmsTableManageMenuRole(projectselect, roleselect);
  }
  async update() {
    console.log(
      'managemenurole > update(): updprojectselect=' + this.updprojectselect
      + ', updroleselect=' + this.updroleselect
      + ', updmenuid=' + this.updmenuid
      + ', updmenutype= ' + this.updmenutype
      + ', updmenutext=' + this.updmenutext
      + ', updmenuurl=' + this.updmenuurl
      + ', updremark=' + this.updremark
    );
    this.clearalert();
    if (
      this.updprojectselect != 'null'
      && this.updroleselect != ''
      && this.updmenuid != ''
      && this.updmenutype != ''
      && this.updmenutext != ''
      && this.updmenuurl != ''
      && this.updremark != ''
    ) {
      const objData = {
        project: this.updprojectselect,
        menuid: this.updmenuid,
        menutype: this.updmenutype,
        rolecode: this.updroleselect,
        menutext: this.updmenutext,
        menuurl: this.updmenuurl,
        remark: this.updremark,
        modifiedby: this.globalVariable.getUsernameen(),
        modifiedon: new Date(),
        flag: "U"
      };
      this.cmsService.updCmsManageMenuRole(JSON.stringify(objData));
      this.savesuccess = true;
      this.clearrequiredata();
      this.cleardata();
      this.reloadselectUpdCmsManageMenuRole(this.updprojectselect, this.updroleselect);
    } else {
      console.log('managerole > update() else');
      this.savefail = true;
      this.requireproject = this.updprojectselect === '' ? true : false;
      this.requirerole = this.updroleselect === '' ? true : false;
      this.requiremenuid = this.updmenuid === '' ? true : false;
      this.requiremenutype = this.updmenutype === '' ? true : false;
      this.requiremenutext = this.updmenutext === '' ? true : false;
      this.requiremenuurl = this.updmenuurl === '' ? true : false;
      this.requireremark = this.updremark === '' ? true : false;
    }
  }
  async delete(data1, data2, data3,data4) {
    this.clearalert();
    this.delprojectselect = data1;
    this.delroleselect = data2;
    this.delmenuid = data3;
    this.delmenutype = data4;
    if (
      confirm("Are you sure to delete " + this.delprojectselect 
      + ', ' + this.delroleselect 
      + ', ' + this.delmenuid 
      + ', ' + this.delmenutype)
    ) {
      const objData = {
        project: this.delprojectselect,
        menuid: this.delmenuid,
        menutype: this.delmenutype,
        rolecode: this.delroleselect,
        menutext: "",
        menuurl: "",
        remark: "",
        modifiedby: this.globalVariable.getUsernameen(),
        modifiedon: new Date(),
        flag: "D"
      };
      console.log(
        'managemenurole > delete(): delprojectselect=' + this.delprojectselect 
        + ', ' + this.delroleselect 
        + ', ' + this.delmenuid 
        + ', ' + this.delmenutype
      );
      this.cmsService.updCmsManageMenuRole(JSON.stringify(objData));
      this.savesuccess = true;
      this.clearrequiredata();
      this.cleardata();
      this.reloadselectUpdCmsManageMenuRole(this.projectselect, this.roleselect);
    }
  }
}
