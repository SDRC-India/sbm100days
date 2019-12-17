import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { filter, map, catchError } from 'rxjs/operators';
import { Constants } from '../constants';
import { IQuestion } from 'lib/public_api';
import { Toast, ToastrService } from 'ngx-toastr';
import saveAs from "save-as";

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  formId;
  submissionId = 0;
  constructor(private httpClient: HttpClient,private toaster:ToastrService) { }

  getQuestionList(formId): Observable<any> {
    this.formId = formId;
    return this.httpClient.get(Constants.HOME_URL + 'getQuestion?formId=' + formId + '&submissioId=' + this.submissionId).pipe(
      map((res: Response) => res)
      //catchError((res: Response) => throwError(res))
    );

  }

  uploadFile(file,columnName): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('formId', this.formId);
    formdata.append('columnName', columnName);

    const req = new HttpRequest('POST', Constants.HOME_URL + 'uploadFile', formdata, {
      reportProgress: true    });

    return this.httpClient.request(req);
  }

  saveFormData(formData: IQuestion[]): any {
    return this.httpClient.post(Constants.HOME_URL + 'draftInstitutionInmates', formData ).pipe(
      map((res: Response) => res),
      catchError((res: Response) => throwError(res))
    );


  }

  finalizeForm(submissionData: IQuestion[]): any {
    return this.httpClient.post(Constants.HOME_URL + 'submitData', submissionData ).pipe(
      map((res: Response) => res),
      catchError((res: Response) => throwError(res))
    );
  }

  getLandingData(): any {
    return this.httpClient.get(Constants.HOME_URL + 'getLandingData').pipe(
      map((res: Response) => res),
      catchError((res: Response) => throwError(res))
    );
  }


  htmltoPDF(formData: any[], formId: number) {
    let fileName = '';

      fileName = formData[0].questions.filter(d => d.columnName == 'q6')[0].value

    this.httpClient.post(Constants.HOME_URL + 'exportSubmissionToPDF', formData, {
      responseType: "blob"
    }).pipe(
      map((res: Blob) => res),
      catchError((res: Blob) => throwError(res))
    ).subscribe(data => {
      saveAs(data, fileName + "_" + new Date().getTime().toString() + ".pdf");
    },
      error => {
        this.toaster.error("Error with server", "Error")
      });
  }
}
