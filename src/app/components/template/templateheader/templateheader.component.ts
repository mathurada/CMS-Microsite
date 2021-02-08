import { Component, OnInit } from '@angular/core';
import { GlobalVariable } from '../../../services/globalvariable.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-templateheader',
  templateUrl: './templateheader.component.html',
  styleUrls: ['./templateheader.component.css',
  '../../../../assets/css/sb-admin-2.min.css',
  '../../../../assets/css/cimb-admin-2.min.css',
  '../../../../assets/vendor/fontawesome-free/css/all.min.css',
  '../../../../assets/vendor/datatables/dataTables.bootstrap4.min.css',
  '../../../../assets/font/font.css']
})
export class TemplateheaderComponent implements OnInit {
  cmsuser;
  cmsrolecode;
  cmsteam;
  pathuserlogo;
  constructor(
    private globalVariable: GlobalVariable
    ,private route: Router
  ) { }
  ngOnInit() {
    this.cmsuser = this.globalVariable.getUsernameen();
    this.cmsrolecode = this.globalVariable.getRolecode();
    this.cmsteam = this.globalVariable.getTeam();
    this.pathuserlogo = "../../../../assets/images/cms/user.png";
    if(this.cmsrolecode ==='ADMIN'){
      this.pathuserlogo = "../../../../assets/images/cms/auser.png";
    }else if(this.cmsrolecode ==='CHECKER'){
      this.pathuserlogo = "../../../../assets/images/cms/cuser.png";
    }else{
      this.pathuserlogo = "../../../../assets/images/cms/muser.png";
    }
    // this.globalVariable.clearSessionTimeout(); // issue 20200110 timeout not limit in 5 min
  }
  onLogout(){
    // console.log('--------- templateheader --------- ');
    // console.log('usernameen: '+this.globalVariable.getUsernameen());
    // console.log('project: ' +this.globalVariable.getProject());
    // console.log('username: '+this.globalVariable.getUsernameen());
    // console.log('role: ' + this.globalVariable.getRolecode());
    this.globalVariable.setProject('');
    this.globalVariable.setUsercode('');
    this.globalVariable.setUsernameen('');
    this.globalVariable.setRolecode('');
    this.globalVariable.setTeam('');
    this.route.navigate(['login']);
  }  
}
