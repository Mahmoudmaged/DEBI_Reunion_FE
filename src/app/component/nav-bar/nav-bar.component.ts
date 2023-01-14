import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
declare var $:any
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  
  tokenUser: boolean = false;
  decoded: any;
  displaySignup: boolean = false;
  displayLogin: boolean = false;
  clicked: boolean = false
  token: any = localStorage.getItem('token');

  sideMessage: string = ""
  sideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-100%" })
    }, 3000);
  }

  constructor(private _Router: Router) {
    $("#SuperAdmin").show()
    if (this.token?.length) {
      $(".nav-logout , .prof , .OCP").show()
      $(".nav-login , .nav-signUp").hide()
    } else {
      $(".nav-logout , .prof , .OCP").hide()
      $(".nav-login , .nav-signUp").show()

    }




  }
  logout() {
    localStorage.clear();
    this._Router.navigateByUrl('/login')
  }


  ngOnInit(): void {
 

    $(".navbar-brand").click(() => {
      this._Router.navigateByUrl(`/`)
    })
    // $(".z").click(() => {
    //   $(".navbar-toggler").click()
    // })
    // $(".navbar-toggler").click(() => {

    //   this.clicked = !this.clicked;

    //   if (this.clicked) {
    //     $(".navbar").addClass("changeColor")
    //     $(".nav-link").addClass("changeNavLink")
    //     $(".fa-bars").addClass('text-light')
    //   }

    // })

    // $(".nav-login").mouseenter(() => {
    //   $(".nav-signUp").css({ "color": "#630E2B",  "background-color": "#fff" })
    // }).mouseleave(() => {
    //   $(".nav-signUp").css({ "color": "#fff",  "background-color": "#000" })
    // })

    // $(".nav-signUp").mouseenter(() => {
    //   $(".nav-login ").css({ "color": "#630E2B",  "background-color": "#fff" })
    // }).mouseleave(() => {
    //   $(".nav-login").css({ "color": "#fff",  "background-color":  "#630E2B" })
    // })

  }


  Navigate(pathURl: string) {
   

  }
}
