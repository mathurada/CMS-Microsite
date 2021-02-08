import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../../services/cms.service';
import { GlobalVariable } from '../../../services/globalvariable.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css',
  '../../../../assets/css/sb-admin-2.min.css',
  '../../../../assets/css/cimb-admin-2.min.css',
  '../../../../assets/vendor/fontawesome-free/css/all.min.css',
  '../../../../assets/vendor/datatables/dataTables.bootstrap4.min.css',
  '../../../../assets/font/font.css']
})
export class PictureComponent implements OnInit {
  lookupchangeid;
  lookupcmspagemaster;
  cmspicture;
  show;
  project;
  showtable;
  pageselect;
  changeid;
  vertype;
  updpictureID; 
  updpageID;
  updproject;
  updvertype;
  updfilepath;
  updfileName;
  updfileType;
  updpicture;
  updpictureRemark;
  requirepage: boolean;
  requirechangeid: boolean;
  requirefilepath;
  requirefileName;
  requirefileType;
  requirepicture;
  requirepictureRemark;
  filevalidate;
  savefail;
  savesuccess;
  showpicture;
  constructor(
    private cmsService:CmsService
    , private globalVariable: GlobalVariable
    , private http : HttpClient
  ){}

  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
    var filesize = this.fileData.size / 1024;
    if(filesize > 2000){
      this.filevalidate = "Warning : Picture file size is " + filesize +  " KB ( Recommend below 2 MB.)";
    }else{
      this.filevalidate = "";
    }
    
  } 
 
  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();      
    console.log('preview(): this.fileData='+this.fileData);
    reader.readAsDataURL(this.fileData); 
    console.log('filedata='+this.fileData);
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
      console.log('previewUrl='+this.previewUrl);
    }
  }
  ngOnInit() {
    console.log('Welcome to Picture page');
    //this.globalVariable.webAuthorize();
    this.project = this.globalVariable.getProject();
    this.lookupcmspagemaster = this.cmsService.selectCmsMsLookupPageMaster(this.project);
    this.show = (this.globalVariable.getRolecode() ==='ADMIN') ? true: false; 
    this.lookupchangeid = this.cmsService.selectCmsLookupChangeID(this.project);
    this.vertype = this.globalVariable.getRolecode() === 'ADMIN' ? 'Master' : 'Draft';
    this.clearrequiredata();
    this.clearalert();
    this.cleardata();
  }
  async onSelect(pageid){
    this.clearalert();
    this.cleardata();
    console.log('picture > onSelect(): input_value=' +  this.changeid);
    this.showtable=false;
    this.pageselect = pageid;
    this.changeid = this.globalVariable.getRolecode() === 'ADMIN'? '': this.changeid;
    if (this.pageselect != 'null' && this.changeid != 'null') {
      this.cmspicture = this.cmsService.selectCmsPictureFile(this.pageselect,this.changeid,this.vertype);
    } else {
      if (this.pageselect === 'null') {
        this.requirepage = true;
      } else {
        this.requirechangeid = true;
      }
    }
  }
  async selectchangeid(changeidd) {
    this.clearalert();
    this.cleardata();
    this.changeid = changeidd;
    console.log('selectchangeid() was called.' + this.changeid);

      if (this.changeid === 'null') {
        this.requirechangeid = true;
      } else {
        this.requirepage = true;
      }

  }
  clearrequiredata() {
    this.pageselect = 'null';
    this.changeid = 'null';
  }
  clearalert() {
    console.log('picture > clearalert');
    this.requirepage = false;
    this.requirechangeid = false;
    this.requirefilepath = false;
    this.requirefileName = false;
    this.requirefileType = false;
    this.requirepicture = false;
    this.requirepictureRemark = false;
    this.savefail = false;
    this.savesuccess = false;
  }
  cleardata() {
    this.updpageID = '';
    this.updpictureID = '';
    this.updfilepath = '';
    this.updfileName = '';
    this.updfileType = '';
    this.updpicture = '';
    this.updpictureRemark = '';
    this.showtable = true;
  }
  onshow(data1) {
    this.showpicture = 'data:image/png;base64,' + data1; // require field
    console.log(
      'picture > onkeyupdate(): updpictureID=' + this.showpicture
    );
  }
  onkeyupdate(data1, data2, data3, data4, data5, data6, data7,data8,data9) {
    this.updpictureID = data1; // require field
    this.updpageID = data2;    // require field
    this.updfilepath = data3; 
    this.updfileName = data4;  
    this.updfileType = data5;
    this.updpicture = data6;
    this.updpictureRemark = data7;
    this.updproject = data8;
    this.updvertype = data9;
    console.log(
      'picture > onkeyupdate(): updpictureID=' + this.updpictureID
      + ', updpageID=' + this.updpageID
      + ', updfilepath=' + this.updfilepath
      + ', updfileName=' + this.updfileName
      + ', updfileType=' + this.updfileType
      + ', updpicture=' + this.updpicture + ', tyoeof = '+ typeof this.updpicture
      + ', updpictureRemark=' + this.updpictureRemark
      + ', updproject=' + this.updproject
      + ', updvertype=' + this.updvertype
    );
  }
  onkeyupdatefield4(event) {
    this.updpicture = event.target.file[0];
    console.log("onkeyupdatefield4(): "+ this.updpicture);
  }
  async reloadselectUpdCmsPicture() {
    if (this.pageselect === 'null') {
      this.cmspicture = this.cmsService.selectCmsPictureFile(this.pageselect,this.changeid,this.vertype);
      this.cmspicture = this.cmsService.selectCmsPictureFile(this.pageselect,this.changeid,this.vertype);
    }
  }
  async update() {
    var a:string = this.previewUrl;
     
    // console.log(
    //   'manageuser > update(): updpictureID=' + this.updpictureID
    //   + ', updpageID=' + this.updpageID
    //   + ', updfilepath=' + this.updfilepath
    //   + ', updfileName= ' + this.updfileName
    //   + ', updfileType=' + this.updfileType
    //   + ', a=' + a.replace('data:image/'+ this.updfileType + ';base64,','')  + ', tyoeof = '+ typeof a
    //   // + ', test=' + btoa(a)  + ', tyoeof = '+ typeof a
    //   + ', test=' + a
    //   + ', previewUrl=' + this.previewUrl  + ', tyoeof = '+ typeof this.previewUrl
    //   + ', updpictureRemark=' + this.updpictureRemark
    // );
   
    this.clearalert();
    if (
      this.updpictureID != ''
      && this.updpageID != ''
      && this.updfilepath != ''
      && this.updfileName != ''
      && this.updfileType != ''
      && a != ''
      && this.updpictureRemark != ''
    ) {
      const objData = {
        project:this.updproject,
        pageid:this.updpageID,
        vertype: this.globalVariable.getRolecode() === 'ADMIN' ? 'Master' : 'Draft',
        changeid:this.changeid,
        pictureid:this.updpictureID,
        picture: a.replace('data:image/png;base64,','').replace('data:image/jpeg;base64,','') ,
        // picture: this.updpicture,
        modifiedby:this.globalVariable.getUsernameen(),
        modifiedon:new Date()
      };
      this.cmsService.updCmsPicture(JSON.stringify(objData));
      this.savesuccess = true;
      this.clearrequiredata();
      this.cleardata();
      this.reloadselectUpdCmsPicture();
    } else {
      console.log('picture > update() else');
      this.savefail = true;
      this.requirefilepath = this.updfilepath === '' ? true : false;
      this.requirefileName = this.updfileName === '' ? true : false;
      this.requirefileType = this.updfileType === '' ? true : false;
      this.requirepicture = this.updpicture === '' ? true : false;
      this.requirepictureRemark = this.updpictureRemark === '' ? true : false;
      this.clearrequiredata();
      this.cleardata();
    }
  }
}


