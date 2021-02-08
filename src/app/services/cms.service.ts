import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalVariable } from './globalvariable.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CmsService {
  constructor(
    private route: Router
    , private http: HttpClient
    , private globalVariable: GlobalVariable
  ) { }
  getBaseUrl() {
    return 'https://10.11.146.53:8666/';
  }
  /** Start CMS - Login */
  selectCmsLogin(user: string, pwd: string) {
    return this.http.get('CMSManagement/cms_user?usercode=' + user + '&passcode=' + pwd).toPromise();
  }
  /** Start Template */
  selectCmsMenuRole() {
    console.log('cms.service > selectCmsMenuRole()'
      + ' project=' + this.globalVariable.getProject()
      + ", rolecode=" + this.globalVariable.getRolecode()
    );
    return this.http.get('CMSManagement/cms_menu_role?project=' + this.globalVariable.getProject() + '&rolecode=' + this.globalVariable.getRolecode());
  }
  /** Star Editor - Lookup */
  selectCmsMsLookupPageMaster(project) {
    return this.http.get('CMSManagement/cms_ms_lookup?project=' + project + '&tablename=CMS_PageMaster');
  }
  selectCmsMsLookupSystem(project) {
    return this.http.get('CMSManagement/cms_ms_lookup?project=' + project + '&tablename=CMS_SystemFile');
  }
  selectCmsMsLookupHeader(project) {
    return this.http.get('CMSManagement/cms_ms_lookup?project=' + project + '&tablename=CMS_header');
  }
  selectCmsMsLookupMenu(project) {
    return this.http.get('CMSManagement/cms_ms_lookup?project=' + project + '&tablename=CMS_menu');
  }
  selectCmsMsLookupFooter(project) {
    return this.http.get('CMSManagement/cms_ms_lookup?project=' + project + '&tablename=CMS_footer');
  }
  selectCmsMsLookupPageLayout(project) {
    return this.http.get('CMSManagement/cms_ms_lookup?project=' + project + '&tablename=CMS_pagelayout');
  }
  selectCmsLookupChangeID(project) {
    return this.http.get('CMSManagement/cms_changeid?project=' + project + '&requestby=' + this.globalVariable.getUsernameen());
  }
  selectCmsLookupProject(project) {
    return this.http.get('CMSManagement/cms_ms_lookup?project=' + project + '&tablename=project');
  }
  selectCmsLookupRole(project) {
    return this.http.get('CMSManagement/cms_ms_lookup?project=' + project + '&tablename=CMS_role');
  }
  selectCmsLookupStatus(project) {
    return this.http.get('CMSManagement/cms_ms_lookup?project=' + project + '&tablename=requeststatus');
  }
  selectCmsTableManageUser(project) {
    return this.http.get('CMSManagement/cms_ms_user?project=' + project);
  }
  selectCmsTableManageRole(project) {
    return this.http.get('CMSManagement/cms_ms_role?project=' + project);
  }
  selectCmsTableManageMenuRole(project, role) {
    return this.http.get('CMSManagement/cms_ms_menu_role?project=' + project + '&rolecode=' + role);
  }
  /** Star Editor - Lookup */
  chkVertypeSelectCmsPageMaster(pageid, changeid) {
    const a = this.http.get(
      'CMSManagement/cms_pagemaster?project=' + this.globalVariable.getProject() +
      '&pageid=' + pageid +
      '&verType=Draft' + 
      '&changeid=' + changeid
    ).toPromise();
    console.log('a[0]: ' + a[0]);
    if (a[0] == null) {
      console.log('checkvertype() if');
      return 'Master'
    } else {
      console.log('checkvertype() else');
      return 'Draft';
    }
  }
  chkVertypeselectCmsPictureFile(pageid, changeid) {
    var a = this.http.get('CMSManagement/cms_picturefile?project=' + this.globalVariable.getProject() +
      '&pageid=' + pageid +
      '&vertype=Draft' +
      '&changeid=' + changeid
    ).toPromise();
    console.log('a[0]: ' + a);
    if (a[0] == null) {
      console.log('checkvertype() if');
      return 'Master'
    } else {
      console.log('checkvertype() else');
      return 'Draft';
    }
  }
  chkVertypeselectCmsHeader(headerid, changeid) {
    var a = this.http.get('CMSManagement/cms_header?project=' + this.globalVariable.getProject() +
      '&headerid=' + headerid +
      '&verType=' + this.globalVariable.getVertype() +
      '&changeid=' + changeid
    ).toPromise();
    console.log('a[0]: ' + a);
    if (a[0] == null) {
      console.log('checkvertype() if');
      return 'Master'
    } else {
      console.log('checkvertype() else');
      return 'Draft';
    }
  }
  chkVertypeselectCmsMenu(menuid, changeid) {
    var a = this.http.get('CMSManagement/cms_menu?project=' + this.globalVariable.getProject() +
      '&menuid=' + menuid +
      '&verType=' + this.globalVariable.getVertype() +
      '&changeid=' + changeid
    ).toPromise();
    console.log('a[0]: ' + a);
    if (a[0] == null) {
      console.log('checkvertype() if');
      return 'Master'
    } else {
      console.log('checkvertype() else');
      return 'Draft';
    }
  }
  chkVertypeselectCmsFooter(footerid, changeid) {
    var a = this.http.get(
      'CMSManagement/cms_footer?project=' + this.globalVariable.getProject() +
      '&footerid=' + footerid +
      '&verType=' + this.globalVariable.getVertype() +
      '&changeid=' + changeid
    ).toPromise();
    console.log('a[0]: ' + a);
    if (a[0] == null) {
      console.log('checkvertype() if');
      return 'Master'
    } else {
      console.log('checkvertype() else');
      return 'Draft';
    }
  }
  chkVertypeselectCmsPageLayout(layoutid, changeid) {
    var a = this.http.get('CMSManagement/cms_pagelayout?project=' + this.globalVariable.getProject() +
      '&layoutid=' + layoutid +
      '&verType=' + this.globalVariable.getVertype() +
      '&changeid=' + changeid
    ).toPromise();
    console.log('a[0]: ' + a);
    if (a[0] == null) {
      console.log('checkvertype() if');
      return 'Master'
    } else {
      console.log('checkvertype() else');
      return 'Draft';
    }
  }
  chkVertypeselectCmsMetaTag(pageid, changeid) {
    var a = this.http.get('CMSManagement/cms_metapage?project=' + this.globalVariable.getProject() +
      '&pageid=' + pageid +
      '&verType=' + this.globalVariable.getVertype() +
      '&changeid=' + changeid
    ).toPromise();
    console.log('a[0]: ' + a);
    if (a[0] == null) {
      console.log('checkvertype() if');
      return 'Master'
    } else {
      console.log('checkvertype() else');
      return 'Draft';
    }
  }
  chkVertypeselectCmsPageFile(pageid, changeid) {
    var a = this.http.get('CMSManagement/cms_pagefile?project=' + this.globalVariable.getProject() +
      '&pageid=' + pageid +
      '&verType=' + this.globalVariable.getVertype() +
      '&changeid=' + changeid
    ).toPromise();
    console.log('a[0]: ' + a);
    if (a[0] == null) {
      console.log('checkvertype() if');
      return 'Master'
    } else {
      console.log('checkvertype() else');
      return 'Draft';
    }
  }
  chkVertypeselectCmsSystemFile(pageid, changeid) {
    var a = this.http.get('CMSManagement/cms_systemfile?project=' + this.globalVariable.getProject() +
      '&systemid=' + pageid +
      '&vertype=' + this.globalVariable.getVertype() +
      '&changeid=' + changeid
    ).toPromise();
    console.log('a[0]: ' + a);
    if (a[0] == null) {
      console.log('checkvertype() if');
      return 'Master'
    } else {
      console.log('checkvertype() else');
      return 'Draft';
    }
  }

  selectCmsSEOReport(data1) {
    console.log('data1='+data1);
    return this.http.get('CMSManagement/cms_seo_report?project=' + this.globalVariable.getProject()
      + '&pageid=' + data1
    );
  }
  selectCmsRequest(data1, data2, data3, data4, data5 ,data6) {
    console.log('data1='+data1+', data2='+data2+', data3=' + data3+ ', data4= ' + data4+', data5='+data5, 'data6='+data6);
    return this.http.get('CMSManagement/cms_request?project=' + this.globalVariable.getProject()
      + '&requestby=' + data1
      + '&approveby=' + data2
      + '&fromdate=' + data3
      + '&todate=' + data4
      + '&status=' + data5
      + '&team=' + data6
    );
  }
  selectCmsApprove(data1, data2, data3, data4, data5,data6) {
    console.log('data1='+data1+', data2='+data2+', data3=' + data3+ ', data4= ' + data4+', data5='+data5, 'data6='+data6);
    return this.http.get('CMSManagement/cms_approve?project=' + this.globalVariable.getProject()
      + '&requestby=' + data1
      + '&approveby=' + data2
      + '&fromdate=' + data3
      + '&todate=' + data4
      + '&status=' + data5
      + '&team=' + data6
    );
  }
  selectCmsChangeDetail(changeid) {
    return this.http.get('CMSManagement/cms_change_detail?project=' + this.globalVariable.getProject()
      + '&changeid=' + changeid
    ).toPromise();
  }
  selectCmsHome(data1) {
    console.log('data1='+data1);
    return this.http.get('CMSManagement/cms_home?project=' + this.globalVariable.getProject()
      + '&requestby=' + data1
    ).toPromise();
  }
  selectCmsPageMaster(pageid, changeid , vertype) {
    console.log('selectCmsPageMaster()' + pageid + ", vertype=" + this.globalVariable.getVertype());
    return this.http.get(
      'CMSManagement/cms_pagemaster?project=' + this.globalVariable.getProject() +
      '&pageid=' + pageid +
      '&verType=' + vertype +
      '&changeid=' + changeid
    ).toPromise();
  }
  CheckCmsPageMaster(pageid) {
    return this.http.get(
      'CMSManagement/cms_pagemaster?project=' + this.globalVariable.getProject() +
      '&pageid=' + pageid +
      '&verType=Check' +
      '&changeid='
    ).toPromise();
  }
  selectCmsPictureFile(pageid, changeid , vertype) {
    // console.log('selectCmsPictureFile()' + pageid + ", vertype=" + this.globalVariable.getVertype());
      return this.http.get(
        'CMSManagement/cms_picturefile?project=' + this.globalVariable.getProject() +
        '&pageid=' + pageid +
        '&vertype=' + vertype +
        '&changeid=' + changeid
      ).toPromise();
  }
  selectCmsHeader(headerid, changeid) {
    return this.http.get('CMSManagement/cms_header?project=' + this.globalVariable.getProject() +
      '&headerid=' + headerid +
      '&verType=' + this.chkVertypeselectCmsHeader(headerid, changeid) +
      '&changeid=' + changeid
    ).toPromise();
  }
  selectCmsMenu(menuid, changeid) {
    return this.http.get('CMSManagement/cms_menu?project=' + this.globalVariable.getProject() +
      '&menuid=' + menuid +
      '&verType=' + this.chkVertypeselectCmsMenu(menuid, changeid) +
      '&changeid=' + changeid
    ).toPromise();
  }
  selectCmsFooter(footerid, changeid) {
    console.log('cms.service > selectCmsFooter(), footerid=' + footerid + ", changeid=" + changeid);
    return this.http.get(
      'CMSManagement/cms_footer?project=' + this.globalVariable.getProject() +
      '&footerid=' + footerid +
      '&verType=' + this.chkVertypeselectCmsFooter(footerid, changeid) +
      '&changeid=' + changeid
    ).toPromise();
  }
  selectCmsPageLayout(layoutid, changeid) {
    console.log('cms.service > selectCmsFooter()');
    return this.http.get('CMSManagement/cms_pagelayout?project=' + this.globalVariable.getProject() +
      '&footerid=' + layoutid +
      '&verType=' + this.chkVertypeselectCmsPageLayout(layoutid, changeid) +
      '&changeid=' + changeid
    ).toPromise();
  }
  selectCmsMetaTag(pageid, changeid) {
    return this.http.get('CMSManagement/cms_metapage?project=' + this.globalVariable.getProject() +
      '&pageid=' + pageid +
      '&verType=' + this.chkVertypeselectCmsMetaTag(pageid, changeid) +
      '&changeid=' + changeid
    ).toPromise();
  }
  selectCmsParamid() {
    return this.http.get('CMSManagement/cms_ms_metatag?project=' + this.globalVariable.getProject()).toPromise();
  }
  selectCmsPageFile(pageid, changeid) {
    console.log('cms.service > selectCmsPageFile()');
    return this.http.get('CMSManagement/cms_pagefile?project=' + this.globalVariable.getProject() +
      '&pageid=' + pageid +
      '&verType=' + this.chkVertypeselectCmsPageFile(pageid, changeid) +
      '&changeid=' + changeid
    ).toPromise();
  }
  selectCmsSystemFile(pageid, changeid) {
    console.log('cms.service > selectCmsSystemFile()');
    return this.http.get('CMSManagement/cms_systemfile?project=' + this.globalVariable.getProject() +
      '&systemid=' + pageid +
      '&vertype=' + this.chkVertypeselectCmsSystemFile(pageid, changeid) +
      '&changeid=' + changeid
    ).toPromise();
  }
  selectCmsMetaParam() {
    return this.http.get('CMSManagement/cms_metaparameter');
  }
  selectCmsPrefix() {
    return this.http.get('CMSManagement/cms_prefix');
  }
  selectCmsCity() {
    return this.http.get('CMSManagement/cms_city');
  }
  selectCmsOccupation() {
    return this.http.get('CMSManagement/cms_occupation');
  }
  /**  CMS - Parameter: insert */
  insCmsMsLookupPageMaster() {
  }
  insCmsMsLookupHeader() {
  }
  insCmsMsLookupMenu() {
  }
  insCmsMsLookupFooter() {
  }
  insCmsNewRequest(data) {
    console.log("cms.service > updCmsPageMaster().");
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    this.http.post(
      'CMSManagement/cms_ins_changerequest', data, options
    ).toPromise().then(
      (data) => {
        this.route.navigate(['newrequest']);
      }
    ).catch(
      (err) => {
        console.log('Error' + JSON.stringify(err));
      }
    );
  }
  insCmsGeneratePage(data) {
    console.log("cms.service > updCmsPageMaster().");
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    this.http.post(
      'CMSManagement/cms_gen_pagefile', data, options
    ).toPromise().then(
      (data) => {
        // this.route.navigate(['newrequest']);
      }
    ).catch(
      (err) => {
        console.log('Error' + JSON.stringify(err));
      }
    );
  }

  UploadCmsPagefile() {
    return this.http.get('CMSManagement/uploadFile').toPromise();
  }
  UploadCmsPicturefile() {
    return this.http.get('CMSManagement/uploadPicture').toPromise();
  }
  UploadCmsSystemfile() {
    return this.http.get('CMSManagement/uploadSystemFile').toPromise();
  }
  /**  CMS - Parameter: Update */
  updCmsApprove(data) {
    console.log("cms.service > updCmsPageMaster().");
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.post(
      'CMSManagement/cms_approve_request', data, options
    ).toPromise().then(
      (data) => {
        this.route.navigate(['content']);
      }
    ).catch(
      (err) => {
        console.log('Error' + JSON.stringify(err));
        // window.alert(JSON.stringify(err['status'] + ': '+err['statusText']));
        // this.route.navigate(['content']); 
      }
    );
  }
  updCmsPageMaster(data) {
    console.log("cms.service > updCmsPageMaster().");
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.post(
      'CMSManagement/cms_upd_pagemaster', data, options
    ).toPromise().then(
      (data) => {
        this.route.navigate(['content']);
      }
    ).catch(
      (err) => {
        console.log('Error' + JSON.stringify(err));
      }
    );
  }
  updCmsPicture(data) {
    console.log("cms.service > updCmsPicture().");
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.post(
      'CMSManagement/cms_upd_picture', data, options
    ).toPromise().then(
      (data) => {
        this.route.navigate(['content']);
      }
    ).catch(
      (err) => {
        console.log('Error' + JSON.stringify(err));
      }
    );
  }
  updCmsHeader(data) {
    console.log("cms.service > updCmsHeader().");
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    this.http.post(
      'CMSManagement/cms_upd_header', data, options
    ).toPromise().then(
      (data) => {
        this.route.navigate(['header']);
      }
    ).catch(
      (err) => {
        console.log('Error' + JSON.stringify(err));
      }
    );
  }
  updCmsMenu(data) {
    console.log("cms.service > updCmsMenu().");
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    this.http.post(
      'CMSManagement/cms_upd_menu', data, options
    ).toPromise().then(
      (data) => {
        this.route.navigate(['menu']);
      }
    ).catch(
      (err) => {
        console.log('Error' + JSON.stringify(err));
      }
    );
  }
  updCmsFooter(data) {
    console.log("cms.service > updCmsFooter().");
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    this.http.post(
      'CMSManagement/cms_upd_footer', data, options
    ).toPromise().then(
      (data) => {
        this.route.navigate(['footer']);
      }
    ).catch(
      (err) => {
        console.log('Error' + JSON.stringify(err));
      }
    );
  }
  updCmsPageFile(data) {
    console.log("cms.service > updCmsPageFile().");
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    this.http.post(
      'CMSManagement/cms_upd_pagefile', data, options
    ).toPromise().then(
      (data) => {
        this.route.navigate(['admincontent']);
      }
    ).catch(
      (err) => {
        console.log('Error' + JSON.stringify(err));
      }
    );
  }
  updCmsSystemFile(data) {
    console.log("cms.service > updCmsSystemFile().");
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    this.http.post(
      'CMSManagement/cms_upd_systemfile', data, options
    ).toPromise().then(
      (data) => {
        this.route.navigate(['systemcontent']);
      }
    ).catch(
      (err) => {
        console.log('Error' + JSON.stringify(err));
      }
    );
  }
  updCmsMetaTag(data) {
    console.log("cms.service > updCmsMetaTag().");
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    this.http.post(
      'CMSManagement/cms_upd_metatag', data, options
    ).toPromise().then(
      (data) => {
        this.route.navigate(['metatag']);
      }
    ).catch(
      (err) => {
        console.log('Error' + JSON.stringify(err));
      }
    );
  }
  updCmsMetaParam(data) {
    console.log("cms.service > updCmsMetaParam().");
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    this.http.post(
      'CMSManagement/cms_upd_metaparameter', data, options
    ).toPromise().then(
      (data) => {
        // this.route.navigate(['admincontent']);
      }
    ).catch(
      (err) => {
        console.log('Error' + JSON.stringify(err));
      }
    );
  }
  updCmsPrefix(data) {
    console.log("cms.service > updCmsPrefix().");
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    this.http.post(
      'CMSManagement/cms_upd_prefix', data, options
    ).toPromise().then(
      (data) => {
        // this.route.navigate(['admincontent']);
      }
    ).catch(
      (err) => {
        console.log('Error' + JSON.stringify(err));
      }
    );
  }
  updCmsCity(data) {
    console.log("cms.service > updCmsCity().");
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    this.http.post(
      'CMSManagement/cms_upd_city', data, options
    ).toPromise().then(
      (data) => {
        // this.route.navigate(['admincontent']);
      }
    ).catch(
      (err) => {
        console.log('Error' + JSON.stringify(err));
      }
    );
  }
  updCmsOccupation(data) {
    console.log("cms.service > updCmsOccupation().");
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    this.http.post(
      'CMSManagement/cms_upd_occupation', data, options
    ).toPromise().then(
      (data) => {
        // this.route.navigate(['admincontent']);
      }
    ).catch(
      (err) => {
        console.log('Error' + JSON.stringify(err));
      }
    );
  }
  updCmsManageUser(data) {
    console.log("cms.service > updCmsManageUser().");
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    this.http.post(
      'CMSManagement/cms_upd_user', data, options
    ).toPromise().then(
      (data) => {
        // this.route.navigate(['newrequest']);
      }
    ).catch(
      (err) => {
        console.log('Error' + JSON.stringify(err));
      }
    );
  }
  updCmsManageRole(data) {
    console.log("cms.service > updCmsManageRole().");
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    this.http.post(
      'CMSManagement/cms_upd_role', data, options
    ).toPromise().then(
      (data) => {
        // this.route.navigate(['newrequest']);
      }
    ).catch(
      (err) => {
        console.log('Error' + JSON.stringify(err));
      }
    );
  }
  updCmsManageMenuRole(data) {
    console.log("cms.service > updCmsManageMenuRole().");
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    this.http.post(
      'CMSManagement/cms_upd_menu_role', data, options
    ).toPromise().then(
      (data) => {
        // this.route.navigate(['newrequest']);
      }
    ).catch(
      (err) => {
        console.log('Error' + JSON.stringify(err));
      }
    );
  }

  approveRequest(data) {
    console.log("cms.service > approveRequest().");
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    this.http.post(
      'CMSManagement/cms_approve_request', data, options
    ).toPromise().then(
      (data) => {
        // this.route.navigate(['newrequest']);
      }
    ).catch(
      (err) => {
        console.log('Error' + JSON.stringify(err));
      }
    );
  }
}