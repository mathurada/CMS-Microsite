import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../services/cms.service'; 
import { Router } from '@angular/router'
import { GlobalVariable } from '../../services/globalvariable.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',
  '../../../assets/css/sb-admin-2.min.css',
  '../../../assets/css/cimb-admin-2.min.css']
})
export class LoginComponent implements OnInit{
  movies: any[];
  usn:string = "";
  psd:string = "";
  alert = false;
  alertMsg ='';
  constructor(
    private route: Router
    ,private cmsService: CmsService
    ,private globalVariable: GlobalVariable
  ) { }
  async onSubmit(event: any) {
    console.log('onSubmit() was called.');
    this.usn = event.target.InputUser.value;
    this.psd = event.target.InputPassword.value;
    
    if (this.usn != '' && this.psd != '') {
      console.log('under if');
      const res = await this.cmsService.selectCmsLogin(this.usn,this.psd);
      if( res[0] != null ){
        console.log('Enter project: '+res[0]['project']);
        console.log('Enter usercode: '+res[0]['userCode']);
        this.globalVariable.setProject(res[0]['project']);
        this.globalVariable.setUsercode(res[0]['userCode']);
        this.globalVariable.setUsernameen(res[0]['userNameEN']);
        this.globalVariable.setRolecode(res[0]['roleCode']);
        this.globalVariable.setTeam(res[0]['team']);
        this.globalVariable.setVertype(res[0]['roleCode']==='ADMIN'? 'Master': 'Draft');
        this.route.navigate(['home']);   
      }else{
        console.log('this.usn && this.psd invalid');
        this.alert = true;
        this.alertMsg = 'Invalid username or password';
      }
    }else{
      console.log('this.usn && this.psd == null');
      this.alert = true;
      this.alertMsg = 'Enter username and/or password';
    }
  }
  ngOnInit() {
    console.log('Welcome to Login page');
    //this.globalVariable.webAuthorize();
  }
}