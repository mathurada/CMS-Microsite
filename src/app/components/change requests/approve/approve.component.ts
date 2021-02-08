import { Component, OnInit } from '@angular/core';
import { GlobalVariable } from '../../../services/globalvariable.service';
import { CmsService } from '../../../services/cms.service';
import { delay } from 'q';
var moment = require('moment');
@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css',
    '../../../../assets/css/sb-admin-2.min.css',
    '../../../../assets/css/cimb-admin-2.min.css',
    '../../../../assets/vendor/fontawesome-free/css/all.min.css',
    '../../../../assets/vendor/datatables/dataTables.bootstrap4.min.css',
    '../../../../assets/font/font.css']
})
export class ApproveComponent implements OnInit {
  lookupcmsstatus;
  cmsapprove;
  detailapprove;
  project;
  team;
  requestedby;
  approvedby;
  fromdate;
  todate;
  statusselect;
  updchangeid;
  updchangedesc;
  updrequestBy;
  updrequestOn;
  updrequestRemark;
  updapproveRemark;
  updpageid;
  approvefail;
  approvesuccess;
  approvests;
  rejectfail;
  rejectsuccess;
  requirefromdate;
  requiretodate
  insfromdate;
  instodate;
  uploadpic;
  uploadfile;
  rowi;
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
    console.log('Welcome to Approve page');
    this.clearrequiredata();
    this.clearalert();
    this.cleardata();
    //this.globalVariable.webAuthorize();
    this.project = this.globalVariable.getProject();
    this.team = this.globalVariable.getTeam();
    this.reloadselectCmsApprove();
    this.lookupcmsstatus = this.cmsService.selectCmsLookupStatus(this.project);

  }
  clearrequiredata() {
  }

  clearalert() {
    console.log('approve > clearalert');
    this.approvefail = false;
    this.approvesuccess = false;
    this.rejectfail = false;
    this.rejectsuccess = false;
    this.requirefromdate = false;
    this.requiretodate = false;
  }
  cleardata() {
    this.requestedby = '';
    this.approvedby = '';
    this.fromdate = '';
    this.todate = '';
    this.statusselect = '';
    this.updrequestBy = '';
    this.updrequestOn = '';
    this.updrequestRemark = '';
    this.updapproveRemark = '';
    this.insfromdate = moment().subtract(60, 'days').format('YYYY/MM/DD');
    this.instodate = moment().format('YYYY/MM/DD');
  }
  onkeysearchfield1(event: any) {
    this.requestedby = event.target.value;
  }
  onkeysearchfield2(event: any) {
    this.approvedby = event.target.value;
  }
  onkeysearchfield3(value: Date): void {
    this.fromdate = value;
    this.insfromdate = moment(this.fromdate).format('YYYY/MM/DD'); 
  }
  onkeysearchfield4(value: Date): void {
    this.todate = value;
    this.instodate = moment(this.todate).format('YYYY/MM/DD');
  }
  onkeysearchfield5(status) {
    this.statusselect = status;
  }
  async reloadselectCmsApprove() {
    this.cmsapprove = this.cmsService.selectCmsApprove(this.requestedby, this.approvedby, this.insfromdate, this.instodate, this.statusselect, this.team);
    this.cmsapprove = this.cmsService.selectCmsApprove(this.requestedby, this.approvedby, this.insfromdate, this.instodate, this.statusselect, this.team);
  }
  async search() {
    this.clearalert();
    if(this.fromdate != '' && this.todate != '' ){
      this.reloadselectCmsApprove();
    }else{
      this.requirefromdate = this.fromdate === '' ? true:false;
      this.requiretodate = this.todate === '' ? true:false;
    }
  }
  onkeyupdate(data1, data2, data3, data4, data5, data6,data7) {
    this.updchangeid = data1;
    this.updchangedesc = data2;
    this.updrequestBy = data3;
    this.updrequestOn = data4;
    this.updrequestRemark = data5;
    this.updapproveRemark = data6;
    this.updpageid = data7;
    console.log(
      'approve > onkeyupdate() updchangeid=' + this.updchangeid  + ', updchangedesc=' + this.updchangedesc
    );
  }
  async approve() {
    this.clearalert();
    console.log('approve > approve(): updchangeid=' + this.updchangeid + ', updchangedesc=' + this.updchangedesc);
if (this.updchangeid != '' && this.updchangedesc != '') {
    this.detailapprove = await this.cmsService.selectCmsChangeDetail(this.updchangeid);
    if(typeof(this.detailapprove[0]) == "undefined"){
      // console.log('detail approve: ' + this.detailapprove[0]['editStatus']);
    }else{
      this.rowi = 0;
      for (let entry of this.detailapprove){
        
        // console.log('detail approve: ' + this.detailapprove[this.rowi]['changeID']);
        // console.log('detail approve: ' + this.detailapprove[this.rowi]['editStatus']);
        // console.log('detail approve: ' + this.detailapprove[this.rowi]['editId']);
        const objData = {
        project: this.project,
        pageid:  this.detailapprove[this.rowi]['changeID'],
        apptype:  this.detailapprove[this.rowi]['editStatus'],
        changeid: this.detailapprove[this.rowi]['editId'],
        approveby: this.globalVariable.getUsernameen(),
        approveon: new Date()
        };
        this.approvests =  await this.cmsService.approveRequest(JSON.stringify(objData));
        this.rowi += 1;
        await delay(1000);
      }
        const objData = {
        project: this.project,
        pageid: '',
        apptype: 'A',
        changeid: this.updchangeid,
        approveby: this.globalVariable.getUsernameen(),
        approveon: new Date()
        };
        this.approvests =  await this.cmsService.approveRequest(JSON.stringify(objData));

        await delay(3000);
        this.uploadfile = this.cmsService.UploadCmsPicturefile();
        await delay(3000);
        this.uploadpic = this.cmsService.UploadCmsPagefile();
        this.approvesuccess = true;
        this.clearrequiredata();
        this.cleardata();
         
      }
    }
    
  }

  async reject() {
    this.clearalert();
    console.log('approve > reject(): updchangeid=' + this.updchangeid + ', updchangedesc=' + this.updchangedesc);
    if (
      this.updchangeid != ''
      && this.updchangedesc != ''
    ) {
      const objData = {
        project: this.project,
        pageid: this.updpageid,
        apptype: 'D',
        changeid: this.updchangeid,
        approveby: this.globalVariable.getUsernameen(),
        approveon: new Date()
      };
      this.cmsService.approveRequest(JSON.stringify(objData));
      this.approvesuccess = true;
      this.clearrequiredata();
      this.cleardata();
    } else {
      console.log('reject > approve() else');
      this.approvefail = true;
    }
  }
}

  
  
