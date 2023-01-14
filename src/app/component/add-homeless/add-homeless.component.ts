import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomelessService } from 'src/app/services/homeless.service';
import { ReportService } from 'src/app/services/report.service';
import { UserService } from 'src/app/services/user.service';

declare var $:any
@Component({
  selector: 'app-add-homeless',
  templateUrl: './add-homeless.component.html',
  styleUrls: ['./add-homeless.component.scss']
})
export class AddHomelessComponent implements OnInit {

  panelOpenState = false;
  images: any;
  reporterInfo: boolean = false;
  responseData: any[] = [];
  shelters: any[] = []
  load: boolean = false;
  angle: boolean = false;
  reportInfoMessage: string = "Add finder information";
  egyptCity = this._UserService.egyptCity;
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
    public _Router: Router) {
    this.getShelters()
  }

  ngOnInit(): void {
  }
  showReportDetails() {
    //  $()
  }

  showReporterInfo(): any {

    this.reporterInfo = !this.reporterInfo
    if (!this.reporterInfo) {
      this.reportInfoMessage = "Add finder information"
    } else {
      this.reportInfoMessage = "Hide finder information"

    }
    return this.angle = !this.angle
  }
  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      console.log(this.images);
    }
  }

  addHomeless = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z\u0621-\u064Aء-ئ][^#&<>\"~;$^%{}?]{1,20}$/)]),
    age: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
    gender: new FormControl('Male', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    lostLocation: new FormControl(this.egyptCity[0].governorate_name_en, [Validators.required]),
    lostTime: new FormControl('', [Validators.required]),
    shelter: new FormControl('', [Validators.required]),
    reporterName: new FormControl('', [Validators.pattern(/[a-zA-Z\u0621-\u064Aء-ئ][^#&<>\"~;$^%{}?]{1,20}$/)]),
    reporterEmail: new FormControl('', [Validators.email]),
    reporterNationalID: new FormControl('', [Validators.minLength(14), Validators.maxLength(14)]),
    reporterPhone: new FormControl('', []),
    description: new FormControl('', [Validators.pattern(/[a-zA-Z\u0621-\u064Aء-ئ][^#&<>\"~;$^%{}?]{1,20}$/)]),
  })



  handelAddHomeless(): any {
    if (this.addHomeless.valid) {
      this.load = true;
      console.log(this.addHomeless.controls.shelter.value);
      const formData = new FormData();
      formData.append("image", this.images);
      formData.append("name", this.addHomeless.controls.name.value);
      formData.append("shelterID", this.addHomeless.controls.shelter.value);
      formData.append("age", this.addHomeless.controls.age.value);
      formData.append("gender", this.addHomeless.controls.gender.value);
      formData.append("foundLocation", this.addHomeless.controls.lostLocation.value);
      formData.append("foundTime", this.addHomeless.controls.lostTime.value);
      formData.append("description", this.addHomeless.controls.description.value);
      if (this.addHomeless.controls.reporterName.value.length) {
        formData.append("reporterName", this.addHomeless.controls.reporterName.value);
        formData.append("reporterEmail", this.addHomeless.controls.reporterEmail.value);
        formData.append("reporterNationID", this.addHomeless.controls.reporterNationalID.value);
        formData.append("reporterPhone", this.addHomeless.controls.reporterPhone.value);
      }
      this._HomelessService.addHomeless(formData).subscribe(
        res => {
          const { message, data } = res
          this.load = false;
          if (message == "Done") {
            console.log("Done");
            this.sideError("Done ✔")
            this._Router.navigateByUrl("/homeless")
          }
        },
        err => {
          this.load = false;

          const { error } = err
          console.log(error);
        
          this.sideError(error.err)
        }
      )
    }
  }


  getShelters(): any {



    this._UserService.shelterList().subscribe(
      (res): any => {
        const { message, shelterList } = res;
        if (message == "Done") {
          this.shelters = shelterList
          if (this.shelters.length) {
            this.addHomeless.controls.shelter.setValue(this.shelters[0]._id);
          }
          console.log(this.shelters);
          return this.shelters
        }
      },
      err => {
        console.log(err);

      }
    )
  }


}
