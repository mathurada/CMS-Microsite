import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../services/cms.service';
import { GlobalVariable } from '../../services/globalvariable.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',
  '../../../assets/css/sb-admin-2.min.css',
  '../../../assets/css/cimb-admin-2.min.css',
  '../../../assets/vendor/fontawesome-free/css/all.min.css',
  '../../../assets/vendor/datatables/dataTables.bootstrap4.min.css',
  '../../../assets/font/font.css']
})
export class HomeComponent implements OnInit {
  cmsuser;
  cmsrolecode;
  yearlynum;
  requestnum;
  approvenum;
  pendingnum;
  text1;
  text2;
  text3;
  text4;
  text5;
  text6;
  text7;
  text8;
  text9;
  text10;
  approveper;
  pendingper;
  text1per;
  text2per;
  text3per;
  text4per;
  text5per;
  text6per;
  text7per;
  text8per;
  text9per;
  text10per;
  constructor(
    private cmsService: CmsService
    ,private globalVariable : GlobalVariable
  ) { }
  ngOnInit() {
    console.log('Welcome to Home page');
    /*this.cmsuser = this.globalVariable.getUsernameen();
    this.globalVariable.webAuthorize();
    this.cmsrolecode = this.globalVariable.getRolecode();
    if(this.cmsrolecode ==='ADMIN' || this.cmsrolecode ==='CHECKER'){
      this.selecthome('');
    }else{
      this.selecthome(this.cmsuser);
    }
    */

  }
  async selecthome(user) {
      const cmshome = await this.cmsService.selectCmsHome(user);
      // console.log('cmshome : ' + cmshome[0]['yearly']);
      this.yearlynum = cmshome[0]['yearly'];
      this.requestnum = cmshome[0]['request'];
      this.approvenum = cmshome[0]['approved'];
      this.pendingnum = cmshome[0]['pending'];
      this.text1 = cmshome[0]['h1'];
      this.text2 = cmshome[0]['h2'];
      this.text3 = cmshome[0]['h3'];
      this.text4 = cmshome[0]['h4'];
      this.text5 = cmshome[0]['h5'];
      this.text6 = cmshome[0]['h6'];
      this.text7 = cmshome[0]['h7'];
      this.text8 = cmshome[0]['h8'];
      this.text9 = cmshome[0]['h9'];
      this.text10 = cmshome[0]['h10'];

      this.approveper = ( this.approvenum / this.requestnum ) * 100;
      this.pendingper = ( this.pendingnum / this.requestnum ) * 100;
      this.text1per = ( this.text1 / this.requestnum ) * 100;
      this.text2per = ( this.text2 / this.requestnum ) * 100;
      this.text3per = ( this.text3 / this.requestnum ) * 100;
      this.text4per = ( this.text4 / this.requestnum ) * 100;
      this.text5per = ( this.text5 / this.requestnum ) * 100;
      this.text6per = ( this.text6 / this.requestnum ) * 100;
      console.log( this.approveper);
  }
}
