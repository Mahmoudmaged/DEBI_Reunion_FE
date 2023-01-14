import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatrialModule } from '../../matrial/matrial.module'
import { ReportService } from 'src/app/services/report.service';
import { Router } from '@angular/router';
import { HomelessService } from 'src/app/services/homeless.service';
import { UserService } from 'src/app/services/user.service';
declare var $: any;
@Component({
  selector: 'app-quick-search',
  templateUrl: './quick-search.component.html',
  styleUrls: ['./quick-search.component.scss']
})
export class QuickSearchComponent implements OnInit {
  panelOpenState = false;
  images: any;
  responseData: any[] = [];
  load: boolean = false;
  matchedPercentage: any[] = []
  resultType: string = 'FR'
  checkToken: boolean = false
  egyptCity = this._UserService.egyptCity;
  shelters: any[] = []
  sideMessage: string = ""
  sideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-100%" })
    }, 3000);
  }

  constructor(private _ReportService: ReportService,
    private _HomelessService: HomelessService,
    private _UserService: UserService,
    public _Router: Router,) {
    if (localStorage.getItem("token")) {
      this.checkToken = true
    }
    this.getShelters();

  }

  ngOnInit(): void {
  }
  showReportDetails() {
    //  $()
  }


  getShelters(): any {
    this._UserService.shelterList().subscribe(
      (res): any => {
        const { message, shelterList } = res;
        if (message == "Done") {
          this.shelters = shelterList
          console.log(this.shelters);
          
          if (this.shelters.length) {
            this.addHomeless.controls.shelter.setValue(this.shelters[0]._id);
          }
          return this.shelters
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      console.log(this.images);

    }
  }

  search = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z\u0621-\u064Aء-ئ][^#&<>\"~;$^%{}?]{1,20}$/)]),
    age: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
    gender: new FormControl('Male', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  })
  handelSearchInHomeLess(): any {
    if (this.search.valid) {
      this.load = true;
      const formData = new FormData();
      if (!this.images) {
        return "image Required"
      }
      formData.append("image", this.images);
      formData.append("name", this.search.controls.name.value);
      formData.append("endAge", this.search.controls.age.value + 5);
      formData.append("startAge", this.search.controls.age.value +(-5));
      formData.append("gender", this.search.controls.gender.value);
      this._HomelessService.search(formData).subscribe(
        res => {
          this.load = false;
          const { message, data } = res
          console.log(res);
          if (message == "Done") {
            this.responseData = data.users;
            this.resultType = data.flag;
            this.matchedPercentage = data.matchedPercentage;
          }
        }, err => {
          this.load = false;
          const { error } = err
          this.sideError(error.err)
        })
    }
  }

  handelSearchInReport() {
    if (this.search.valid) {
      this.load = true;
      const formData = new FormData();
      formData.append("image", this.images);
      formData.append("name", this.search.controls.name.value);
      formData.append("endAge", this.search.controls.age.value + 5);
      formData.append("startAge", this.search.controls.age.value + (-5));
      formData.append("gender", this.search.controls.gender.value);
      console.log(formData);

      this._ReportService.search(formData).subscribe(
        res => {
          this.load = false;
          const { message, data } = res
          console.log(data);
          if (message == "Done") {
            this.responseData = data.users;
            this.resultType = data.flag;
            this.matchedPercentage = data.matchedPercentage;
            console.log(this.matchedPercentage);

          }
        }, err => {
          this.load = false;
          const { error } = err
          this.sideError(error.err)
        })
    }
  }



  addHomeless = new FormGroup({
    lostLocation: new FormControl(this.egyptCity[0].governorate_name_en),
    lostTime: new FormControl('', [Validators.required]),
    shelter: new FormControl('', [Validators.required]),
    reporterName: new FormControl('', [Validators.pattern(/[a-zA-Z\u0621-\u064Aء-ئ][^#&<>\"~;$^%{}?]{1,20}$/)]),
    reporterEmail: new FormControl('', [Validators.email]),
    reporterNationalID: new FormControl('', [Validators.minLength(14), Validators.maxLength(14)]),
    reporterPhone: new FormControl('', []),
    description: new FormControl('', [Validators.pattern(/[a-zA-Z\u0621-\u064Aء-ئ][^#&<>\"~;$^%{}?]{1,20}$/)]),
  })
  angle: boolean = false;
  showReporterInfo(): any {

    this.reporterInfo = !this.reporterInfo
    if (!this.reporterInfo) {
      this.reportInfoMessage = "Add finder information"
    } else {
      this.reportInfoMessage = "Hide finder information"

    }
    return this.angle = !this.angle
  }
  reportInfoMessage: string = "Add finder information";
  reporterInfo: boolean = false;
  displayReportIDIndex: any ;
  displayNotifyRelative(i: any): any {
    this.displayReportIDIndex = i;
    $("#completeModel").modal('show');
  }
  NotifyRelative(i: any): any {
    console.log(i);
    
    if (this.search.valid) {
      this.load = true;
      const formData = new FormData();
      if (!this.images) {
        return "image Required"
      }
      formData.append("image", this.images);
      formData.append("name", this.responseData[i].name);
      formData.append("gender", this.responseData[i].gender);
      formData.append("age", this.responseData[i].age);
      formData.append("destEmail", this.responseData[i].reporterEmail);


      formData.append("shelterID", this.addHomeless.controls.shelter.value);
      formData.append("foundLocation", this.addHomeless.controls.lostLocation.value);

      if (this.addHomeless.controls.reporterName.value.length) {
        formData.append("reporterName", this.addHomeless.controls.reporterName.value);
        formData.append("reporterEmail", this.addHomeless.controls.reporterEmail.value);
        formData.append("reporterNationID", this.addHomeless.controls.reporterNationalID.value);
        formData.append("reporterPhone", this.addHomeless.controls.reporterPhone.value);
      }
      if (this.addHomeless.controls.description.value.length) {
        formData.append("description", this.addHomeless.controls.description.value);
      }
      console.log(formData);
      this._HomelessService.communicateWithParents(formData, this.responseData[i]._id).subscribe(
        res => {
          this.load = false;
          const { message, data } = res
          console.log(res);
          if (message == "Done") {
            this.sideError("Done")
            this._Router.navigateByUrl("/homeless")
          }
        }, err => {
          this.load = false;
          const { error } = err
          this.sideError(error.err)
        })
    }
  }
}
