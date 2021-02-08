import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../../services/cms.service';
import { GlobalVariable } from '../../../services/globalvariable.service';
@Component({
  selector: 'app-metaparameter', 
  templateUrl: './metaparameter.component.html',
  styleUrls: ['./metaparameter.component.css',
    '../../../../assets/css/sb-admin-2.min.css',
    '../../../../assets/css/cimb-admin-2.min.css',
    '../../../../assets/vendor/fontawesome-free/css/all.min.css',
    '../../../../assets/vendor/datatables/dataTables.bootstrap4.min.css',
    '../../../../assets/font/font.css']
})
export class MetaparameterComponent implements OnInit {
    items = [];
    pageOfItems: Array<any>;

    cmsmetaparam;
    paramid;
    project;
    attribute1;
    value1;
    attribute2;
    value2;
    updparamid;
    updattribute1;
    updvalue1;
    updattribute2;
    updvalue2;
    delparamid;
    requireparamid;
    requireattribute1;
    requirevalue1;
    requireattribute2;
    requirevalue2;
    savefail;
    savesuccess;
    constructor(
      private cmsService: CmsService
      , private globalVariable: GlobalVariable
    ) { }
    ngOnInit() {
       console.log('Welcome to Metaparam page');
      // this.globalVariable.webAuthorize();
       this.project = this.globalVariable.getProject();
       this.reloadselectCmsMetaParam();
       this.clearrequire();
       this.clearalert();
       this.cleardata();

      this.cmsmetaparam = this.cmsService.selectCmsMetaParam().toPromise();
      console.log("array text:" + this.cmsmetaparam[0] + ', typeof = ' + typeof this.cmsmetaparam[0]);
      this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
    }
    onChangePage(pageOfItems: Array<any>) {
      // update current page of items
      this.pageOfItems = pageOfItems;
  }




    clearrequire() {
    }
    clearalert() {
      console.log('metaparam>clearalert');
      this.requireparamid = false;
      this.requireattribute1 = false;
      this.requirevalue1 = false;
      this.requireattribute2 = false;
      this.requirevalue2 = false;
      this.savefail = false;
      this.savesuccess = false;
    }
    cleardata() {
      this.paramid = '0';
      this.attribute1 = '';
      this.value1 = '';
      this.attribute2 = '';
      this.value2 = '';
      this.updparamid = '';
      this.updattribute1 = '';
      this.updvalue1 = '';
      this.updattribute2 = '';
      this.updvalue2 = '';
      this.delparamid = '';
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
    onkeyupdate(data1, data2, data3, data4, data5) {
      this.updparamid = data1;
      this.updattribute1 = data2;
      this.updvalue1 = data3;
      this.updattribute2 = data4;
      this.updvalue2 = data5;
      console.log(
        'metaparam>onkeyupdate(): updparamid=' + this.updparamid 
        + ', updattribute1=' + this.updattribute1 
        + ', updvalue1=' + this.updvalue1 
        + ', updattribute2=' + this.updattribute2 
        + ', updvalue2=' + this.updvalue2
      );
    }
    onkeyupdatefield1(event: any) {
      this.updattribute1 = event.target.value;
    }
    onkeyupdatefield2(event: any) {
      this.updvalue1 = event.target.value;
    }
    onkeyupdatefield3(event: any) {
      this.updattribute2 = event.target.value;
    }
    onkeyupdatefield4(event: any) {
      this.updvalue2 = event.target.value;
    }
    clear() {
      console.log('clear()');
      this.reloadselectCmsMetaParam();
    }
    async add() {
      console.log(
        'metaparam>onkeyupdate(): attribute1=' + this.attribute1 
        + ', value1=' + this.value1 
        + ', attribute2=' + this.attribute2 
        + ', value2=' + this.value2
      );
      this.clearalert();
      if (this.attribute1 != '' && this.value1 != '' && this.attribute2 != '' && this.attribute2 != '') {
        const objData = {
          project:this.project,
          paramid:this.paramid,
          paramtype:'',
          text1:this.attribute1,
          text2:this.attribute2,
          text3:'',
          text4:'',
          text5:'',
          default1:this.value1,
          default2:this.value2,
          default3:'',
          default4:'',
          default5:'',
          modifiedby: this.globalVariable.getUsernameen(),
          modifiedon: new Date(),
          flag:'I'
        }
        this.cmsService.updCmsMetaParam(JSON.stringify(objData));
        this.savesuccess = true;
        this.cleardata();
        this.reloadselectCmsMetaParam();
      } else {
        console.log('metaparam>add() else');
        this.savefail = true;
        this.requireattribute1 = this.attribute1 === '' ? true : false;
        this.requirevalue1= this.value1 === '' ? true : false;
        this.requireattribute2 = this.attribute2 === '' ? true : false;
        this.requirevalue2= this.value2 === '' ? true : false;
      }
    }
    async reloadselectCmsMetaParam() {
      this.cmsmetaparam = this.cmsService.selectCmsMetaParam().toPromise();
      this.cmsmetaparam = this.cmsService.selectCmsMetaParam().toPromise();
    }
    async update() {
      console.log(
        'metaparam>update(): updparamid=' + this.updparamid 
        + ', updattribute1=' + this.updattribute1 
        + ', updvalue1=' + this.updvalue1 
        + ', updattribute2=' + this.updattribute2 
        + ', updvalue2=' + this.updvalue2
      );
      this.clearalert();
      if (this.updparamid != '' && this.updattribute1 != '' && this.updvalue1 != '' && this.updattribute2 != '' && this.updvalue2 != '') {
        const objData = {
          project:this.project,
          paramid:this.updparamid,
          paramtype:'',
          text1:this.updattribute1,
          text2:this.updattribute2,
          text3:'',
          text4:'',
          text5:'',
          default1:this.updvalue1,
          default2:this.updvalue2,
          default3:'',
          default4:'',
          default5:'',
          modifiedby: this.globalVariable.getUsernameen(),
          modifiedon: new Date(),
          flag:'U'
        };
        this.cmsService.updCmsMetaParam(JSON.stringify(objData));
        this.savesuccess = true;
        this.cleardata();
        this.reloadselectCmsMetaParam();
      } else {
        console.log('Metaparam>update() else');
        this.savefail = true;
        this.requireparamid = this.updparamid === '0' ? true  : false;
        this.requireattribute1 = this.updattribute1 === '' ? true : false;
        this.requirevalue1= this.updvalue1 === '' ? true : false;
        this.requireattribute2 = this.updattribute2 === '' ? true : false;
        this.requirevalue2= this.updvalue2 === '' ? true : false;
      }
    }
    async delete(data) {
      this.clearalert();
      this.delparamid= data;
      if (confirm("Are you sure to delete " + this.delparamid)) {
        const objData = {
          project:this.project,
          paramid:this.delparamid,
          paramtype:'',
          text1:'',
          text2:'',
          text3:'',
          text4:'',
          text5:'',
          default1:'',
          default2:'',
          default3:'',
          default4:'',
          default5:'',
          modifiedby: this.globalVariable.getUsernameen(),
          modifiedon: new Date(),
          flag:'D'
        };
        console.log('Metaparam>delete(): delparamid=' + this.delparamid);
        this.cmsService.updCmsMetaParam(JSON.stringify(objData));
        this.savesuccess = true;
        this.cleardata();
        this.reloadselectCmsMetaParam();
      }
    }
}