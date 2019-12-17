import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpClient, HttpHeaders, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';
import { SessionCheckService } from './session-check.service';
import { Cookie } from 'ng2-cookies';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, switchMap, finalize, filter, take } from 'rxjs/operators';
import { Constants } from '../constants';
import { AuthService } from './auth.service';

@Injectable()
export class XhrInterceptorService implements HttpInterceptor {

    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);


    constructor(private sessionCheckService: SessionCheckService, private router: Router,
        private http: HttpClient, private authService: AuthService) { }


    addToken(req, token) {
        const authToken = Cookie.get('access_token'); let xhr
        if (authToken && !token)
            xhr = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + authToken) });
        else
            xhr = req.clone();

        return xhr;
    }
    intercept(req: HttpRequest<any>, next: HttpHandler ) {
        let xhr = this.addToken(req, '');
        return next.handle(xhr).pipe(catchError(error => {
            // return this.handleAuthError(x, xhr.url)
            if (error instanceof HttpErrorResponse) {
                switch ((<HttpErrorResponse>error).status) {
                    // case 400:
                    //   return this.handle400Error(error, xhr.url);
                    case 401:
                        return this.handleAuthError(error, xhr);
                }
            } else {
                return Observable.throw(error);
            }
        })
        );
    }

    private handleAuthError(err: HttpErrorResponse, targetUrl): Observable<any> {
        //handle your auth error or rethrow
        if (err.status === 401 || err.status === 403) {
            let str = err.error.error;
            if (str === 'invalid_token') {
                Cookie.delete("access_token")
                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                    })
                };

                let URL: string = Constants.HOME_URL + 'oauth/token'
                // 'refresh_token': refresh_token
                // 'grant_type' : 'refresh_token'
                let params = new URLSearchParams();
                params.append('refresh_token', Cookie.get('refresh_token'));
                params.append('grant_type', 'refresh_token')
                // retreive refresh_token from cookies, 
                // fire /oauth/token, with POST request and params as
                this.http.post(URL, params.toString(), httpOptions).subscribe(res => {
                    // replace the response in Cookie as set 'acess_token' key
                    Cookie.set("access_token", JSON.stringify(res))
                }, err => {
                    // if refesh token is invalid the API call with throw error with message 'Invalid refresh_token'
                    if (err.statusText == 'Invalid refresh_token') {
                        // if refresh token is invalid. Then delete access_token from cookie and redirect to login page
                        this.deleteCookies()
                        this.router.navigateByUrl(`/login`);
                        // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
                        return of(err.message);
                    }

                })

            }
            return of(err.message);
        }
    }
    deleteCookies() {
        Cookie.deleteAll();
    }

}
