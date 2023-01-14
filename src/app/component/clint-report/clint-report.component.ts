import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReportService } from 'src/app/services/report.service';
import { UserService } from 'src/app/services/user.service';
declare var $: any;
@Component({
  selector: 'app-clint-report',
  templateUrl: './clint-report.component.html',
  styleUrls: ['./clint-report.component.scss']
})
export class ClintReportComponent implements OnInit {
  panelOpenState = false;
  images: any;
  responseData: any[] = [];
  stations: any[] = []
  load: boolean = false;
  egyptCity = this._UserService.egyptCity;
  sideMessage: string = ""
  sideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-100%" })
    }, 3000);
  }

  constructor(private _UserService: UserService, private _ReportService: ReportService, public _Router: Router) {
    this.getStations()
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

  addReport = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z\u0621-\u064Aء-ئ][^#&<>\"~;$^%{}?]{1,20}$/)]),
    age: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
    gender: new FormControl('Male', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    lostLocation: new FormControl(this.egyptCity[0].governorate_name_en, [Validators.required]),
    lostTime: new FormControl('', [Validators.required]),
    reporterName: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z\u0621-\u064Aء-ئ][^#&<>\"~;$^%{}?]{1,20}$/)]),
    reporterEmail: new FormControl('', [Validators.required, Validators.email]),
    reporterNationalID: new FormControl('', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
    reporterPhone: new FormControl('', [Validators.required]),
    policeStationID: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z\u0621-\u064Aء-ئ][^#&<>\"~;$^%{}?]{1,20}$/)]),
    description: new FormControl('', [Validators.pattern(/[a-zA-Z\u0621-\u064Aء-ئ][^#&<>\"~;$^%{}?]{1,20}$/)]),

  })

  handelAddReport() {
    if (this.addReport.valid) {
      this.load = true;
      const formData = new FormData();
      console.log(this.addReport.controls.policeStationID.value);
      formData.append("image", this.images);
      formData.append("name", this.addReport.controls.name.value);
      formData.append("age", this.addReport.controls.age.value);
      formData.append("gender", this.addReport.controls.gender.value);
      formData.append("lostLocation", this.addReport.controls.lostLocation.value);
      formData.append("lostTime", this.addReport.controls.lostTime.value);
      formData.append("reporterName", this.addReport.controls.reporterName.value);
      formData.append("reporterEmail", this.addReport.controls.reporterEmail.value);
      formData.append("reporterNationalID", this.addReport.controls.reporterNationalID.value);
      formData.append("reporterPhone", this.addReport.controls.reporterPhone.value);
      formData.append("policeStationID", this.addReport.controls.policeStationID.value);
      if (this.addReport.controls.description.value.length) {
        formData.append("description", this.addReport.controls.description.value);
      }

      this._ReportService.clintAddReport(formData).subscribe(
        res => {
          const { message } = res
          this.load = false;
          if (message == "Done") {
            this.sideError("Done ✔")
          }
        },
        err => {
          this.load = false;
          const { error } = err
          this.sideError(error.err)
        }
      )
    }
  }


  getStations(): any {
    this._UserService.stationList().subscribe(
      (res): any => {
        const { message, stationList } = res;
        if (message == "Done") {
          this.stations = stationList
          if (this.stations.length) {
            this.addReport.controls.policeStationID.setValue(this.stations[0]._id);
          }
          return this.stations
        }
      },
      err => {
        this.load = false;
        const { error } = err
        this.sideError(error.err)
      }
    )
  }

}
