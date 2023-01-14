import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  token: any = localStorage.getItem('token');
  sideMessage: string = "";
  sideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-100%" })
    }, 3000);
  }
  constructor(private _Router: Router) {
    $("#SuperAdmin").show()
    $(".nav-signUp ,.nav-login , .nav-link ,.z ").show()
    $(".nav-logout ").hide()
    if (this.token?.length) {
      $(".nav-logout , .prof ,  .OCP ").show()
      $(".nav-login , .nav-signUp ").hide()
    }else{
      $(".nav-logout , .prof , .OCP").hide()
      $(".nav-login , .nav-signUp").show()
    }
  }
  ngOnInit(): void {
    
  }
  Navigate(pathURl: string) {
    this._Router.navigateByUrl(`/${pathURl}`)
  }
}
