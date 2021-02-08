import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';

import { EnvService } from './config.service';
import { encode } from 'punycode';
import { utf8Encode } from '@angular/compiler/src/util';

@Injectable({
    providedIn: 'root'
})

export class APIService {
    private API_URL;
    constructor(
        private http: Http,
        private route: Router,
        private envService: EnvService
    ) {
        this.API_URL = envService.config.apiUrl;
    }

    async getParameterData(action: string) {

        return new Promise(resolve => {
            this.http.get(this.API_URL + action).toPromise().then((data) => {
                const res = data.json();
                // if (res.RESPONSE_INFO.RESCODE === '000') {
                //     resolve(res);
                // } else {
                //     sessionStorage.setItem('errorMesaage', 'เกิดข้อผิดพลาดบางประการ');
                //     this.route.navigate(['/error']);
                // }
            }).catch((err) => {
                console.log(err);
                sessionStorage.setItem('errorMesaage', 'เกิดข้อผิดพลาดบางประการ');
                this.route.navigate(['/error']);
            });
        });

    }

    async getParameterData2(action: string) {

        return new Promise(resolve => {
            this.http.get(this.API_URL + action).toPromise().then((data) => {
                const res = data.json();
                // if (res.RESPONSE_INFO.RESCODE === '000') {
                //     resolve(res);
                // } else {
                //     sessionStorage.setItem('errorMesaage', 'เกิดข้อผิดพลาดบางประการ');
                //     this.route.navigate(['/error']);
                // }
            }).catch((err) => {
                console.log(err);
                sessionStorage.setItem('errorMesaage', 'เกิดข้อผิดพลาดบางประการ');
                this.route.navigate(['/error']);
            });
        });

    }

    async getMasterData(action: string) {

        return new Promise(resolve => {
            this.http.get(this.API_URL + '/MData/' + action).toPromise().then((data) => {
                const res = data.json();
                if (res.RESPONSE_INFO.RESCODE === '000') {
                    resolve(res);
                } else {
                    sessionStorage.setItem('errorMesaage', 'เกิดข้อผิดพลาดบางประการ');
                    this.route.navigate(['/error']);
                }
            }).catch((err) => {
                console.log(err);
                sessionStorage.setItem('errorMesaage', 'เกิดข้อผิดพลาดบางประการ');
                this.route.navigate(['/error']);
            });
        });

    }

    // async gettext(controller: string, action: string) {

    //     return new Promise(resolve => {
    //         this.http.get('assets/text/personal/prd.json').subscribe(data => {
    //             var someString: string = data.text();
    //             const res1 = JSON.parse(someString)
    //             // const res = jsonObject.json();
    //             const res = res1.json();
    //             if (res.RESPONSE_INFO.RESCODE === '000') {
    //                 resolve(res);
    //             } else if (res.RESPONSE_INFO.RESCODE === '501') {
    //                 resolve(res);
    //             } else {
    //                 sessionStorage.setItem('errorMesaage', 'เกิดข้อผิดพลาดบางประการ');
    //                 this.route.navigate(['/error']);
    //             }
    //         })

    //     });
    // }

    async get(controller: string, action: string) {

        return new Promise(resolve => {
            this.http.get(this.API_URL + '/' + controller + '/' + action).toPromise().then((data) => {
                const res = data.json();
                if (res.RESPONSE_INFO.RESCODE === '000') {
                    resolve(res);
                } else if (res.RESPONSE_INFO.RESCODE === '501') {
                    resolve(res);
                } else {
                    sessionStorage.setItem('errorMesaage', 'เกิดข้อผิดพลาดบางประการ');
                    this.route.navigate(['/error']);
                }
            }).catch((err) => {
                console.log(err);
                sessionStorage.setItem('errorMesaage', 'เกิดข้อผิดพลาดบางประการ');
                this.route.navigate(['/error']);
            });
        });
    }

    post(controller: string, action: string, data: string) {
        const url = this.API_URL + '/' + controller + '/' + action;
        const header = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: header });

        return new Promise(resolve => {
            // tslint:disable-next-line:no-shadowed-variable
            this.http.post(url, data, options).toPromise().then((data) => {
                const res = data.json();
                if (res.RESPONSE_INFO.RESCODE === '000') {
                    resolve(res);
                } else if (res.RESPONSE_INFO.RESCODE === '501') {
                    resolve(res);
                } else if (res.RESPONSE_INFO.RESCODE === '502') {
                    resolve(res);
                } else {
                    sessionStorage.setItem('errorMesaage', 'เกิดข้อผิดพลาดบางประการ');
                    this.route.navigate(['/error']);
                }
            }).catch((err) => {
                console.log(err);
                sessionStorage.setItem('errorMesaage', 'เกิดข้อผิดพลาดบางประการ');
                this.route.navigate(['/error']);
            });
        });
    }

    async getConfig() {
        let configData = '';

        return new Promise(resolve => {
            this.http.get('./assets/env.json').toPromise().then((data) => {
                const res = data.json();
                this.API_URL = res.apiUrl;
            }).catch((err) => {
                console.log(err);
                sessionStorage.setItem('errorMesaage', 'เกิดข้อผิดพลาดบางประการ');
                this.route.navigate(['/error']);
            });
        });
    }

}
