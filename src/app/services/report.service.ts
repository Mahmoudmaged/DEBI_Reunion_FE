import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ReportService {


  baseURL = `http://localhost:3000/api/v1/report`;
  Bearer: string = "ReunionFamilyInFive__";

  constructor(private _HttpClient: HttpClient) { }

  search(data: any): Observable<any> {
    return this._HttpClient.post(this.baseURL + '/search', data);
  }

  addReport(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this._HttpClient.post(this.baseURL + '', data, {
      headers: new HttpHeaders({
        'authorization': `${this.Bearer}${token}`,
      })
    }
    );
  }
  clintAddReport(data: any): Observable<any> {
    return this._HttpClient.post(this.baseURL + '/clintAddReport', data);
  }


  getReportById(data: any): Observable<any> {
    return this._HttpClient.get(this.baseURL + `/getReportById/${data.reportId}/${data.reporterNationalID}`);
  }


  getAllReport(): Observable<any> {
    let token = localStorage.getItem('token');
    return this._HttpClient.get(this.baseURL + "/", {
      headers: new HttpHeaders({
        'authorization': `${this.Bearer}${token}`,
      })
    });
  }
  getReport(): Observable<any> {
    let token = localStorage.getItem('token');
    return this._HttpClient.get(this.baseURL + "viewReports", {
      headers: new HttpHeaders({
        'authorization': `${this.Bearer}${token}`,
      })
    });
  }


  changeReportStatus(id: any, status: string): Observable<any> {
    let token = localStorage.getItem('token');
    console.log(`${this.Bearer}${token}`);

    return this._HttpClient.post(this.baseURL + `/ch/status`, { status, id },
      {
        headers: new HttpHeaders({
          'authorization': `${this.Bearer}${token}`,
        })
      });
  }


  archive(id: any): Observable<any> {
    let token = localStorage.getItem('token');
    return this._HttpClient.get(this.baseURL + `closeReport/${id}`, {
      headers: new HttpHeaders({
        'authorization': `${this.Bearer}${token}`,
      })
    });
  }


  activate(id: any): Observable<any> {
    let token = localStorage.getItem('token');
    return this._HttpClient.get(this.baseURL + `activateReport/${id}`, {
      headers: new HttpHeaders({
        'authorization': `${this.Bearer}${token}`,
      })
    });
  }

  editReportInfo(id: any, data: any): Observable<any> {
    let token = localStorage.getItem('token');
    return this._HttpClient.post(this.baseURL + `updaterReport/${id}`, data, {
      headers: new HttpHeaders({
        'authorization': `${this.Bearer}${token}`,
      })
    });
  }

}
