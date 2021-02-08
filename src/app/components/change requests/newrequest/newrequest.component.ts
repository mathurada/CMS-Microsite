import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../../services/cms.service';
import { GlobalVariable } from '../../../services/globalvariable.service';
@Component({
  selector: 'app-newrequest',
  templateUrl: './newrequest.component.html',
  styleUrls: ['./newrequest.component.css',
  '../../../../assets/css/sb-admin-2.min.css',
  '../../../../assets/css/cimb-admin-2.min.css',
  '../../../../assets/vendor/fontawesome-free/css/all.min.css',
  '../../../../assets/vendor/datatables/dataTables.bootstrap4.min.css',
  '../../../../assets/font/font.css']
})
export class NewrequestComponent implements OnInit {
  changerequestdesc='';
  remark='';
  requirechangerequestdesc:boolean;
  requireremark:boolean;
  savefail:boolean;
  savesuccess:boolean;
  constructor(
    public cmsService: CmsService
    ,public globalVariable: GlobalVariable
  ) { }
  ngOnInit() {
    console.log('Welcome to NewRequest page');
    this.globalVariable.webAuthorize();
    this.cleardata();
  }
  clearalert(){
    console.log('clearalert');
    this.requirechangerequestdesc=false;
    this.requireremark=false;
    this.savefail=false;
    this.savesuccess=false;
  }
  cleardata(){
    this.changerequestdesc='';
    this.remark='';
  }

  checkrequiredata(){
    
    if(this.changerequestdesc === ''){
      this.requirechangerequestdesc =  true;
      return false;
    }
    if(this.remark === ''){
      this.requireremark =  true;
      return false;
    }
    return true;
  }

  async onSubmit(event: any) {
    console.log('newrequest.component.ts: onSubmit() was called.');
    // retrive input from screen
    this.changerequestdesc = (event.target.InputChangeRequestDesc.value).trim();
    this.remark = (event.target.InputRemark.value).trim();
    console.log('this.changerequestdesc: ' +this.changerequestdesc);
    console.log('this.remark: ' +this.remark);
    this.clearalert();
    if (this.checkrequiredata() === true) {
      const objData = { 
        pageid:'',
        project: this.globalVariable.getProject(), 
        changedesc:this.changerequestdesc,
        remark:this.remark,
        modifiedby: this.globalVariable.getUsernameen(), 
        modifiedon: new Date()
      };
      this.cmsService.insCmsNewRequest(JSON.stringify(objData));
      this.savesuccess=true;
      this.cleardata();
      console.log('Onsubmit() success');
    
    }

  }
}
