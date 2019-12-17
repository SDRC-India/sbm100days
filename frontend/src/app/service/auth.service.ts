import { Observable, of, Subject } from 'rxjs';
import { delay } from "rxjs/operators";
import { Cookie } from 'ng2-cookies';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../constants';
import { AppService } from '../app.service';
import { Injector } from '@angular/core';

export class AuthService {
    // Assuming this would be cached somehow from a login call.
    public currentToken: string;
    public newToken: string;
    constructor() {
        // if (this.app.checkLoggedIn())
        //     this.currentToken = Cookie.get("access_token");
    }

    getAuthToken() {
        return Cookie.get("access_token");
    }

    setAuthToken(token) {
        this.currentToken = token;
        Cookie.set("access_token", token);
    }

    


}

