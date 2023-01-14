import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomelessService } from 'src/app/services/homeless.service';
import { ReportService } from 'src/app/services/report.service';
declare var $: any;
@Component({
  selector: 'quick-search-in-homeless-before-add-report',
  templateUrl: './quick-search-in-homeless-before-add-report.component.html',
  styleUrls: ['./quick-search-in-homeless-before-add-report.component.scss']
})
export class QuickSearchInReportComponent implements OnInit {


  panelOpenState = false;
  images: any;
  responseData: any[] = [];
  matchedPercentage: any[] = [];
  resultType: string = 'FR';
  load: boolean = false;
  NoResult: boolean = false;
  checkToken: boolean = false;

  sideMessage: string = ""
  sideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-100%" })
    }, 3000);
  }

  constructor(private _ReportService: ReportService, private _HomelessService: HomelessService, public _Router: Router) {
    if (localStorage.getItem("token")) {
      this.checkToken = true
    }
  }

  ngOnInit(): void {
  }
  showReportDetails() {
    //  $()
  }
  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      console.log(this.images);

    }
  }

  searchReport = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z\u0621-\u064Aء-ئ][^#&<>\"~;$^%{}?]{1,20}$/)]),
    age: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
    gender: new FormControl('Male', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  })


  search = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z\u0621-\u064Aء-ئ][^#&<>\"~;$^%{}?]{1,20}$/)]),
    age: new FormControl('', [Validators.required]),
    gender: new FormControl('Male', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  })
  handelSearchInHomeLess(): any {

    if (this.searchReport.valid) {
      this.NoResult = false
      this.load = true;
      const formData = new FormData();
      if (!this.images) {
        return "image Required"
      }
      formData.append("image", this.images);
      formData.append("name", this.searchReport.controls.name.value);
      formData.append("endAge", this.searchReport.controls.age.value + 5);
      formData.append("startAge", this.searchReport.controls.age.value + (-5));
      formData.append("gender", this.searchReport.controls.gender.value);
      this._HomelessService.search(formData).subscribe(
        res => {
          this.load = false;
          const { message, data } = res
          if (message == "Done") {
            this.responseData = data.users;
            this.resultType = data.flag;
            this.matchedPercentage = data.matchedPercentage;
            this.NoResult = true
          }
        }, err => {
          this.load = false;
          const { error } = err
          console.log(error);
          this.sideError(error.err)

        })
    }
  }

  hadelSearchRport() {
    if (this.search.valid) {
      this.load = true;
      const formData = new FormData();
      formData.append("image", this.images);
      formData.append("name", this.search.controls.name.value);
      formData.append("endAge", this.search.controls.age.value + 5);
      formData.append("startAge", this.search.controls.age.value);
      formData.append("gender", this.search.controls.gender.value);
      console.log(formData);

      this._ReportService.search(formData).subscribe(
        res => {
          this.load = false;
          const { message, data } = res
          console.log(res);
          if (message == "Done") {
            this.responseData = data.users;
            this.resultType = data.flag;
            this.matchedPercentage = data.matchedPrecentage;
          }
        }, err => {
          this.load = false;
          const { error } = err
          this.sideError(error.err)
        })
    }
  }


  navigateToAddingReport() {
    if (localStorage.getItem("token")) {
      this._Router.navigateByUrl("/addReport")
    } else {
      this._Router.navigateByUrl("/clintReport")

    }
  }


}
