import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class SuperAdminPrivalgesService {
baseURL = `http://localhost:3000/`;
// baseURL =`https://runiongpsystem.herokuapp.com/`;

  constructor(private _HttpClient:HttpClient) { }


  getAllPoliceSations(): Observable<any> {
    let token = localStorage.getItem('token');
    console.log(token);
    return this._HttpClient.get(this.baseURL + "displayPoliceStations", {
      headers: new HttpHeaders({
        'token': `${token}`,
      })
    });
  }
  getAllPoliceSationsGust(): Observable<any> {
 
    return this._HttpClient.get(this.baseURL + "displayPoliceStationsGust");
  }

  getAllShlter(): Observable<any> {
    let token = localStorage.getItem('token');
    console.log(token);
    return this._HttpClient.get(this.baseURL + "displayShelters", {
      headers: new HttpHeaders({
        'token': `${token}`,
      })
    });
  }

  changeUserRole(data:any , id:any): Observable<any> {
    let token = localStorage.getItem('token');
    console.log(token);
    return this._HttpClient.post(this.baseURL + `changeRole/${id}`, data ,{
      headers: new HttpHeaders({
        'token': `${token}`,
      })
    });
  }

  deleteUser(id:any): Observable<any> {
    let token = localStorage.getItem('token');
    console.log(token);
    return this._HttpClient.get(this.baseURL + `deleteUser/${id}`, {
      headers: new HttpHeaders({
        'token': `${token}`,
      })
    });
  }
  

  getPoliceStationRequestToJoin(): Observable<any> {
    let token = localStorage.getItem('token');
    console.log(token);
    return this._HttpClient.get(this.baseURL + `displaySignUpRequest`, {
      headers: new HttpHeaders({
        'token': `${token}`,
      })
    });
  }


  getShelterRequestToJoin(): Observable<any> {
    let token = localStorage.getItem('token');
    console.log(token);
    return this._HttpClient.get(this.baseURL + `displayShelterSignUpRequest`, {
      headers: new HttpHeaders({
        'token': `${token}`,
      })
    });
  }

  approveRequest(id:any): Observable<any> {
    let token = localStorage.getItem('token');
    console.log(token);
    return this._HttpClient.get(this.baseURL + `aprroveSignUpRequest/${id}`, {
      headers: new HttpHeaders({
        'token': `${token}`,
      })
    });
  }
  
}
