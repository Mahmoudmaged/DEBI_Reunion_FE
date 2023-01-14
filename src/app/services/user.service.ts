import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { keyframes } from '@angular/animations';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL = `http://localhost:3000/api/v1/`;
  Bearer: string = "ReunionFamilyInFive__";
  sideMessage: string = "";
  constructor(private _HttpClient: HttpClient, private _Router: Router) { }


  sideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-100%" })
    }, 3000);
  }


  signIn(data: any): Observable<any> {
    return this._HttpClient.post(this.baseURL + "auth/login", data);
  }
  signUp(data: any): Observable<any> {
    return this._HttpClient.post(this.baseURL + "auth/signup", data);
  }

  isLogedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {

    localStorage.clear()
    this._Router.navigateByUrl("")
  }

  profile(): Observable<any> {
    const token = localStorage.getItem('token');
    return this._HttpClient.get(this.baseURL + 'user/profile', {
      headers: new HttpHeaders({
        'authorization': `${this.Bearer}${token}`,
      })
    });
  }



  shelterList(): Observable<any> {
    const token = localStorage.getItem('token');
    return this._HttpClient.get(this.baseURL + 'admin/shelterList', {
      headers: new HttpHeaders({
        'authorization': `${this.Bearer}${token}`,
      })
    });
  }
  stationList(): Observable<any> {
    const token = localStorage.getItem('token');
    return this._HttpClient.get(this.baseURL + 'admin/stationList');
  }

  sendCode(data: any): Observable<any> {
    return this._HttpClient.patch(this.baseURL + 'auth/sendCode', data);
  }

  forgetPassword(data: any): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'auth/forgetPassword', data);
  }
  checkCode(data: any): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'auth/checkCode', data);
  }

  restForgetPassword(data: any): Observable<any> {
    return this._HttpClient.patch(this.baseURL + 'auth/forgetPassword', data);
  }
  updatePassword(data: any): Observable<any> {
    let token = localStorage.getItem("token")
    return this._HttpClient.patch(this.baseURL + 'updatePassword', data, {
      headers: new HttpHeaders({
        'token': `${token}`,
      })
    });
  }




  updateImage(data: any): Observable<any> {
    let token = localStorage.getItem("token")
    return this._HttpClient.patch(this.baseURL + 'auth/updateimage', data, {
      headers: new HttpHeaders({
        'token': `${token}`,
      })
    });
  }

  updateUserNameAndLocation(data: any): Observable<any> {
    let token = localStorage.getItem("token")
    return this._HttpClient.put(this.baseURL + "auth/updateuserInfo", data, {
      headers: new HttpHeaders({
        'token': `${token}`,
      })
    });
  }
  confirmEmail(): Observable<any> {
    return this._HttpClient.get(this.baseURL + "auth/confirmMail");
  }
  feedBack(data: any): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'auth/feedBack', data);
  }


  // ==========================================================================
  // ==========================================================================
  // ==========================================================================
  // ==========================================================================
  // ==========================================================================
  // ==========================================================================
  // ==========================================================================

  egyptCity: any[] = [

    { "id": "1", "governorate_name_ar": "القاهرة", "governorate_name_en": "Cairo" },
    { "id": "2", "governorate_name_ar": "الجيزة", "governorate_name_en": "Giza" },
    { "id": "3", "governorate_name_ar": "الأسكندرية", "governorate_name_en": "Alexandria" },
    { "id": "4", "governorate_name_ar": "الدقهلية", "governorate_name_en": "Dakahlia" },
    { "id": "5", "governorate_name_ar": "البحر الأحمر", "governorate_name_en": "Red Sea" },
    { "id": "6", "governorate_name_ar": "البحيرة", "governorate_name_en": "Beheira" },
    { "id": "7", "governorate_name_ar": "الفيوم", "governorate_name_en": "Fayoum" },
    { "id": "8", "governorate_name_ar": "الغربية", "governorate_name_en": "Gharbiya" },
    { "id": "9", "governorate_name_ar": "الإسماعلية", "governorate_name_en": "Ismailia" },
    { "id": "10", "governorate_name_ar": "المنوفية", "governorate_name_en": "Menofia" },
    { "id": "11", "governorate_name_ar": "المنيا", "governorate_name_en": "Minya" },
    { "id": "12", "governorate_name_ar": "القليوبية", "governorate_name_en": "Qaliubiya" },
    { "id": "13", "governorate_name_ar": "الوادي الجديد", "governorate_name_en": "New Valley" },
    { "id": "14", "governorate_name_ar": "السويس", "governorate_name_en": "Suez" },
    { "id": "15", "governorate_name_ar": "اسوان", "governorate_name_en": "Aswan" },
    { "id": "16", "governorate_name_ar": "اسيوط", "governorate_name_en": "Assiut" },
    { "id": "17", "governorate_name_ar": "بني سويف", "governorate_name_en": "Beni Suef" },
    { "id": "18", "governorate_name_ar": "بورسعيد", "governorate_name_en": "Port Said" },
    { "id": "19", "governorate_name_ar": "دمياط", "governorate_name_en": "Damietta" },
    { "id": "20", "governorate_name_ar": "الشرقية", "governorate_name_en": "Sharkia" },
    { "id": "21", "governorate_name_ar": "جنوب سيناء", "governorate_name_en": "South Sinai" },
    { "id": "22", "governorate_name_ar": "كفر الشيخ", "governorate_name_en": "Kafr Al sheikh" },
    { "id": "23", "governorate_name_ar": "مطروح", "governorate_name_en": "Matrouh" },
    { "id": "24", "governorate_name_ar": "الأقصر", "governorate_name_en": "Luxor" },
    { "id": "25", "governorate_name_ar": "قنا", "governorate_name_en": "Qena" },
    { "id": "26", "governorate_name_ar": "شمال سيناء", "governorate_name_en": "North Sinai" },
    { "id": "27", "governorate_name_ar": "سوهاج", "governorate_name_en": "Sohag" }
  ]

}
