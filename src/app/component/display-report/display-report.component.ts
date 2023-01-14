import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from 'src/app/services/report.service';
import { UserService } from 'src/app/services/user.service';
declare var $: any
@Component({
  selector: 'app-display-report',
  templateUrl: './display-report.component.html',
  styleUrls: ['./display-report.component.scss']
})
export class DisplayReportComponent implements OnInit {
 
  panelOpenState = false;
  images: any;
  responseData: any[] = [];
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

  constructor(public _ActivatedRoute: ActivatedRoute, private _UserService: UserService, private _ReportService: ReportService, public _Router: Router) {
    this.addReport.controls.reportID.setValue(this._ActivatedRoute.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {
  }



  addReport = new FormGroup({
    reporterNationalID: new FormControl('', [Validators.required]),
    reportID: new FormControl('', [Validators.required])
  })

  report: any = {}
  handelGetReport() {
    if (this.addReport.valid) {
      this.load = true;
      const data = {
        reporterNationalID: this.addReport.controls.reporterNationalID.value,
        reportId: this.addReport.controls.reportID.value
      }

      this._ReportService.getReportById(data).subscribe(
        res => {
          const { message, data } = res
          this.load = false;
          if (message == "Done") {
            this.report = data
            return this.report
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

  navigate(ac: string) {
    this._Router.navigateByUrl(`/${ac}`)
  }
}
