import { Component, OnInit } from '@angular/core';
import { GlobalVariable } from '../../../services/globalvariable.service';
import { CmsService } from '../../../services/cms.service';
var moment = require('moment');
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css',
    '../../../../assets/css/sb-admin-2.min.css',
    '../../../../assets/css/cimb-admin-2.min.css',
    '../../../../assets/vendor/fontawesome-free/css/all.min.css',
    '../../../../assets/vendor/datatables/dataTables.bootstrap4.min.css',
    '../../../../assets/font/font.css']
})
export class RequestComponent implements OnInit {
  lookupcmsstatus;
  cmsrequest;
  project;
  requestedby;
  approveby;
  team;
  fromdate;
  todate;
  statusselect;
  insfromdate;
  instodate;
  requirefromdate;
  requiretodate;
  bsConfigFromdate = Object.assign(
    {},
    { containerClass: 'theme-default' },
    { dateInputFormat: 'YYYY/MM/DD' }
  );
  bsConfigTodate = Object.assign(
    {},
    { containerClass: 'theme-default' },
    { dateInputFormat: 'YYYY/MM/DD' }
  );
  constructor(
    private globalVariable: GlobalVariable
    , private cmsService: CmsService
  ) { }
  ngOnInit() {
    console.log('Welcome to Request page');
    this.clearrequiredata();
    this.clearalert();
    this.cleardata();
    //this.globalVariable.webAuthorize();
    this.project = this.globalVariable.getProject();
    this.team = this.globalVariable.getTeam();
    this.reloadselectCmsRequest();
    this.lookupcmsstatus = this.cmsService.selectCmsLookupStatus(this.project);
  }
  clearrequiredata() {
  }
  clearalert() {
    this.requirefromdate = false;
    this.requiretodate = false;
  }
  cleardata() {
    // this.requestedby = this.globalVariable.getRolecode() === 'ADMIN' ? '' : this.globalVariable.getUsernameen();
    this.requestedby = '';
    this.approveby = '';
    this.fromdate = '';
    this.todate = '';
    this.statusselect = '';
    this.insfromdate = moment().subtract(60, 'days').format('YYYY/MM/DD');
    this.instodate = moment().format('YYYY/MM/DD');
  }
  onkeysearchfield1(event: any) {
    this.approveby = event.target.value;
  }
  onkeysearchfield2(value: Date): void {
    this.fromdate = value;
    this.insfromdate = moment(this.fromdate).format('YYYY/MM/DD'); 
  }
  onkeysearchfield3(value: Date): void {
    this.todate = value;
    this.instodate = moment(this.todate).format('YYYY/MM/DD');
  }
  onkeysearchfield4(status) {
    this.statusselect = status;
  }
  async reloadselectCmsRequest() {
    this.cmsrequest = this.cmsService.selectCmsRequest(this.requestedby, this.approveby, this.insfromdate, this.instodate, this.statusselect ,this.team);
    this.cmsrequest = this.cmsService.selectCmsRequest(this.requestedby, this.approveby, this.insfromdate, this.instodate, this.statusselect ,this.team);
  }
  async search() {
    this.clearalert();
    if(this.fromdate != '' && this.todate != '' ){
      this.reloadselectCmsRequest();
    }else{
      this.requirefromdate = this.fromdate === '' ? true:false;
      this.requiretodate = this.todate === '' ? true:false;
    }
  }
}
