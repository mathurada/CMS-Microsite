import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../services/cms.service';
import { GlobalVariable } from '../../services/globalvariable.service';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css',
    '../../../assets/css/sb-admin-2.min.css',
    '../../../assets/css/cimb-admin-2.min.css',
    '../../../assets/vendor/fontawesome-free/css/all.min.css',
    '../../../assets/vendor/datatables/dataTables.bootstrap4.min.css',
    '../../../assets/font/font.css'
  ]
})
export class ReportComponent implements OnInit {
  lookupchangeid;
  lookupcmspagemaster;
  cmspicture;
  show;
  project;
  pageselect;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['SEO'], ['Lack']];
  public pieChartData: SingleDataSet = [80, 20];
  public pieChartType: ChartType = 'doughnut';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(
    private cmsService: CmsService
    , private globalVariable: GlobalVariable
  ) {  
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    console.log('Welcome to Report page');
    this.globalVariable.webAuthorize();
    this.project = this.globalVariable.getProject();
    this.lookupcmspagemaster = this.cmsService.selectCmsMsLookupPageMaster(this.project);
    this.show = (this.globalVariable.getRolecode() === 'ADMIN') ? true : false;
    this.clearrequiredata();
    this.clearalert();
    this.cleardata();
  }
  clearrequiredata() {
    this.pageselect = 'null';
  }
  clearalert() {
  }
  cleardata() {
  }

  async selectpage(pageid) {
    this.pageselect = pageid;
    this.selectseo(this.pageselect);
  }

  async selectseo(pageid) {
    const cmshome = await this.cmsService.selectCmsSEOReport(pageid);

    // this.yearlynum = cmshome[0]['yearly'];
    // this.requestnum = cmshome[0]['request'];
    // this.approvenum = cmshome[0]['approved'];
    // this.pendingnum = cmshome[0]['pending'];
    // this.text1 = cmshome[0]['h1'];
    // this.text2 = cmshome[0]['h2'];
    // this.text3 = cmshome[0]['h3'];
    // this.text4 = cmshome[0]['h4'];
    // this.text5 = cmshome[0]['h5'];
    // this.text6 = cmshome[0]['h6'];
    // this.text7 = cmshome[0]['h7'];
    // this.text8 = cmshome[0]['h8'];
    // this.text9 = cmshome[0]['h9'];
    // this.text10 = cmshome[0]['h10'];

    // this.approveper = ( this.approvenum / this.requestnum ) * 100;
    // this.pendingper = ( this.pendingnum / this.requestnum ) * 100;
    // this.text1per = ( this.text1 / this.requestnum ) * 100;
    // this.text2per = ( this.text2 / this.requestnum ) * 100;
    // this.text3per = ( this.text3 / this.requestnum ) * 100;
    // this.text4per = ( this.text4 / this.requestnum ) * 100;
    // this.text5per = ( this.text5 / this.requestnum ) * 100;
    // this.text6per = ( this.text6 / this.requestnum ) * 100;
    // console.log( this.approveper);
}



}

















