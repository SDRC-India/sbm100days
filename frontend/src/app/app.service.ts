import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { error } from 'selenium-webdriver';
import { Cookie } from 'ng2-cookies';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Constants } from './constants';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class AppService {
    authenticated = false;
    logoutSuccess:boolean = false;
    isValid: boolean = true;
    _data : any;
    validationMsg: any;
    constructor(private http: HttpClient, private router: Router, private spinner: NgxSpinnerService) {
        // this.userIdle.onTimeout().subscribe(() => console.log('Time is up!'));
    }

    
    authenticate(credentials, callback) {   
        this.spinner.show()
        this.isValid = false;
        this.callServer(credentials).subscribe(response=>{      
          this._data=response;   //store the token
           Cookie.set('access_token',this._data.access_token);
           Cookie.set('refresh_token',this._data.refresh_token);
                
          const httpOptions = {
            headers: new HttpHeaders({
              'Authorization': 'Bearer ' + this._data.access_token,
              'Content-type': 'application/json'
            })
          };
          this.spinner.hide();
          this.http.get(Constants.HOME_URL+'oauth/user', httpOptions).subscribe(user=>{
            
            Cookie.set('user_details',JSON.stringify(user));        
            this.router.navigateByUrl('/');    
            this.isValid = true;    
          });
        },  error=>{
          if(error == "User is disabled")
          this.validationMsg = "Given username has been disabled. Please contact your admin";
          else  if(error == "Invalid Credentials !" || error == "Bad credentials")
          this.validationMsg = "Wrong username/password entered";
          setTimeout(()=>{
            this.validationMsg ="";
          }, 3000)
          this.spinner.hide();
          this.isValid = true;
        })
      }
    
      callServer(userDetails){

        const httpOptions = {
          headers: new HttpHeaders ({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
          })
        };
    
        let URL: string =  Constants.HOME_URL + 'oauth/token'
        let params = new URLSearchParams();
        params.append('username', userDetails.username);
        params.append('password', userDetails.password);    
        params.append('grant_type','password');
        params.append('client_id','web');
    
        return this.http.post(URL, params.toString(), httpOptions)    
        .pipe(
          catchError(this.handleError)
        );
      }

      private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error.error_description}`);       
        }
        // return an observable with a user-facing error message
        return throwError(
          //'Something bad happened; please try again later.');     
          error.error.error_description);
      };

    checkLoggedIn() : boolean{
        if (!Cookie.check('access_token')){
            return false
        }else{
          return true
        }
    }
    
    //handles nav-links which are going to be shown 
  checkUserAuthorization(expectedRoles) {


    if(Cookie.check('user_details')){
      var token = JSON.parse(Cookie.get('user_details'));
    }
    let flag = false;
    if(token !==undefined){
    if (this.checkLoggedIn() && token.authorities) {
      expectedRoles.forEach(expectedRole => {
        for(let i=0; i< token.authorities.length; i++){          
          if (token.authorities[i] == expectedRole) {
            flag = true;
          }  
        }      
      });      
    }
   }
    return flag;
  }

    logout() {
            
      this.deleteCookies()
      this.router.navigateByUrl('/');
      this.logoutSuccess = true;
      setTimeout(()=>{
          this.logoutSuccess = false;
      },2000)   
    }

    deleteCookies(){
      Cookie.deleteAll();
    }

    getUserDetails(){
      if(this.checkLoggedIn())
      return JSON.parse(Cookie.get('user_details'));
      else
      return {}
    }
    
    // saveToken(token){
    //     var expireDate = new Date().getTime();
    //     let date = new Date(expireDate);
    
    //     Cookie.set("access_token", JSON.stringify(token), 4/24);
    //     this.router.navigate(['/']);
    // }
    // getToken(): any{
    //     return Cookie.get("access_token");
    // }

}
