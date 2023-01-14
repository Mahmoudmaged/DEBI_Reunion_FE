import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { ReportService } from 'src/app/services/report.service';
import { HomelessService } from '../../services/homeless.service';
import { UserService } from '../../services/user.service';
declare var $: any;
@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss']
})
export class SuperAdminComponent implements OnInit {
  isActive:boolean=false
  responseData: any[] = []
  sideMessage: string = ""
  sideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-100%" })
    }, 3000);
  }
  constructor(private _ReportService: ReportService, private el: ElementRef, private _UserService: UserService, public _Router: Router) {
    _ReportService.getAllReport().subscribe(
      res => {
        this.responseData = res.report
        console.log(this.responseData);

      }, err => {
        console.log(err);
      })
  }

  ngOnInit(): void {


  }

  closeOvelAll() {
    $(".overLayerAll").css({ "right": "-100%" });

  }
  Navigate(pathURl: string) {
    this._Router.navigateByUrl(`/${pathURl}`)
  }

}
