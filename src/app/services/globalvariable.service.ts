import { Injectable } from '@angular/core';
import { CreateCustomer } from '../systemconfig/Customer';
import { UtilityMethod } from '../utility/util';
import { AppService } from '../systemconfig/sysConfig';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class GlobalVariable {
    private product: string;
    private UtmSource;
    private Securedcustomer: any;
    private customer: any;
    private maxLoan: number = null;
    // login > ipaddres = ip computer's user , workstation = computer name or device name
    private ipaddress = ''; 
    private workstation = '';  
    private project = '';
    private usercode = '';
    private usernameen = '';
    private rolecode = '';
    private userlogon = '';
    private teamcode = '';
    // editors > edit content page > API: cms_pagemaster: lookup: page
    private footerid = '';
    private vertype = '';
    private pageid = '';
    private changeid = '';
    // editors > edit content page > API: cms_pagemaster: lookup: header
    private headerid = '';
    // editors > edit content page > API: cms_pagemaster: lookup: header
    private menuid = '';
    // editors > edit content page > API: cms_pagefile: upd cms_admincontent

    constructor(private Createcustomer: CreateCustomer,
        private util: UtilityMethod,
        private appService: AppService,
        private route: Router
    ) {
        this.Securedcustomer = Createcustomer.getSecuredCustomer();
        this.customer = Createcustomer.getUnSecuredCustomer();
    }
    getMaxloan() {
        return this.maxLoan;
    }
    setMaxloan(val) {
        this.maxLoan = parseFloat(this.util.RemoveCommas(val));
    }
    // start login > naviagate to homepage (Check authorize to other page)
    getProject() {
        return this.project;
    }
    setProject(val) {
        this.project = val;
    }
    getUsercode() {
        return this.usercode;
    }
    setUsercode(val) {
        this.usercode = val;
    }
    getUsernameen() {
        return this.usernameen;
    }
    setUsernameen(val) {
        this.usernameen = val;
    }
    getRolecode() {
        return this.rolecode;
    }
    setRolecode(val) {
        this.rolecode = val;
    }
    getUserlogon() {
        return this.userlogon;
    }
    setUserlogon(val) {
        this.userlogon = val;
    }
    getTeam() {
        return this.teamcode;
    }
    setTeam(val) {
        this.teamcode = val;
    }
    getIpaddress() {
        return this.ipaddress;
    }
    setIpaddress(val) {
        this.ipaddress = val;
    }
    getWorkstation() {
        return this.workstation;
    }
    setWorkstation(val) {
        this.workstation = val;
    }
    getVertype(){
        return this.vertype;
    }
    setVertype(val){
        this.vertype = val;
    }
    // start editor > edit admin content
    getCmsPageid(){
        return this.pageid;
    }
    setCmsPageid(val){
        this.pageid = val;
    }
    //  start editor > edit header
    getCmsHeaderid(){
    return this.headerid;
    }
    setCmsHeaderid(val){
        this.headerid = val;
    }
    //  start editor > edit menu
    getCmsMenuid(){
        return this.menuid;
    }
    setCmsMenuid(val){
        this.menuid = val;
    }
    //  start editor > edit footer
    getCmsFooterid(){
        return this.footerid;
    }
    setCmsFooterid(val){
        this.footerid = val;
    }
    //  start xxxx > xxxxxx
    getCmsChangeid(){
        return this.changeid;
    }
    setCmsChangeid(val){
        this.changeid = val;
    }
    
    webAuthorize(){
        console.log('globalvariable.service > webauthorize()');
        if (this.project === ''){
          this.route.navigate(['login']);
        }
    }
    clearSessionTimeout(){
        console.log('globalvariable.service > settimeout()');
        setTimeout(() => {  
            this.project ='';
            this.usercode ='';
            this.usernameen='';
            this.rolecode='';
         }, 300000);
    }
}
