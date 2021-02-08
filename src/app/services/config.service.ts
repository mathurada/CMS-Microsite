import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EnvService {
    private appConfig;
    constructor (private injector: Injector) { }

    loadEnvConfig() {
        let http = this.injector.get(HttpClient);
        return http.get('assets/env.json')
        .toPromise()
        .then(data => {
            this.appConfig = data;
        })
    }
    get config() {
        return this.appConfig;
    }
}
   