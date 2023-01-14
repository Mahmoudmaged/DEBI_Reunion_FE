import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class HomelessService {
  baseURL = `http://localhost:3000/api/v1/homeless`;
  Bearer: string = "ReunionFamilyInFive__";

  constructor(private _HttpClient: HttpClient) { }

  search(data: any): Observable<any> {
    return this._HttpClient.post(this.baseURL + '/search', data);
  }

  getAllHomeless(): Observable<any> {
    const token = localStorage.getItem('token');
    return this._HttpClient.get(this.baseURL, {
      headers: new HttpHeaders({
        'authorization': `${this.Bearer}${token}`,
      })
    });
  }
  addHomeless(formData: any): Observable<any> {
    let token = localStorage.getItem('token');
    return this._HttpClient.post(this.baseURL + `/`, formData, {
      headers: new HttpHeaders({
        'authorization': `${this.Bearer}${token}`,
      })
    });
  }

  changeHomelessStatus(id: any, status: string): Observable<any> {
    let token = localStorage.getItem('token');
    console.log(`${this.Bearer}${token}`);

    return this._HttpClient.post(this.baseURL + `/status`, { status, id },
      {
        headers: new HttpHeaders({
          'authorization': `${this.Bearer}${token}`,
        })
      });
  }


  getMatchedById(id: any): Observable<any> {
    return this._HttpClient.get(this.baseURL + `/${id}`);
  }
  // 
  searchInHomeless(formData: any): Observable<any> {

    return this._HttpClient.post(this.baseURL + `searchInHomeless`, formData);
  }

  seachINReport(formData: any): Observable<any> {

    let token = localStorage.getItem('token');

    return this._HttpClient.post(this.baseURL + `searchInReportBeforAddInHomeLess`, formData, {
      headers: new HttpHeaders({
        'authorization': `${this.Bearer}${token}`,
      })
    });
  }
  communicateWithParents(formData: any, id: any): Observable<any> {

    let token = localStorage.getItem('token');
    console.log(token);

    return this._HttpClient.post(this.baseURL + `/communicateToParentOfHomeless/${id}`, formData, {
      headers: new HttpHeaders({
        'authorization': `${this.Bearer}${token}`,
      })
    });
  }


  getshelterHomeless(): Observable<any> {
    let token = localStorage.getItem('token');
    console.log(token);
    // return this._HttpClient.post(this.baseURL+'getUserNotes',data)
    return this._HttpClient.get(this.baseURL + "viewAllShelterHomeless", {
      headers: new HttpHeaders({
        'token': `${token}`,
      })
    });
  }
  closeHomeless(id: any): Observable<any> {
    let token = localStorage.getItem('token');
    console.log(token);
    console.log(id);

    return this._HttpClient.get(this.baseURL + `closeHomless/${id}`, {
      headers: new HttpHeaders({
        'token': `${token}`,
      })
    });
  }
  undifinedHomeless(id: any): Observable<any> {
    let token = localStorage.getItem('token');
    console.log(token);
    console.log(id);

    return this._HttpClient.get(this.baseURL + `undifinedHomless/${id}`, {
      headers: new HttpHeaders({
        'token': `${token}`,
      })
    });
  }
  edithomelessInfo(id: any, data: any): Observable<any> {
    let token = localStorage.getItem('token');
    console.log(token);
    return this._HttpClient.post(this.baseURL + `updaterhomeless/${id}`, data, {
      headers: new HttpHeaders({
        'token': `${token}`,
      })
    });
  }

  getAllHomelessByID(id: any): Observable<any> {
    return this._HttpClient.get(this.baseURL + `seachHomelessByIDEmail/${id}`);
  }


}
