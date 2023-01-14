import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { Router } from '@angular/router';
import { ReportService } from 'src/app/services/report.service';
declare var $: any;
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  panelOpenState = false;
  responseData: any[] = []
  sideMessage: string = "";
  load: boolean = true
  sideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-100%" })
    }, 3000);
  }
  constructor(private _ReportService: ReportService, private _Router: Router) {

    this.getAllReports()
  }

  ngOnInit(): void {
  }


  // toggleSideNav(ac: string) {
  //   if (ac == "show") {
  //     $(".toggleOpen").hide()
  //     $(".toggleClose").show()
  //     $(".leftPart").css({ "width": "5% !important" })
  //     $(".middlePart").css({ "width": "95% !important" })
  //   } else {
  //     $(".toggleOpen").show()
  //     $(".toggleClose").hide()
  //     $(".leftPart").css({ "width": "0% !important" })
  //     $(".middlePart").css({ "width": "100% !important" })

  //   }
  // }
  showReportDetails() {
    //  $()
  }
  Navigate(pathURl: string) {
    this._Router.navigateByUrl(`/${pathURl}`)
  }


  getAllReports() {
    this.load = true
    this._ReportService.getAllReport().subscribe(
      res => {
        this.load = false
        this.responseData = res.report
        return this.responseData

      }, err => {
        this.load = false

        console.log(err);
      })
  }

  changeReportStatus(id: string, ac: string) {
    this.load = true;
    console.log({ id, ac });

    this._ReportService.changeReportStatus(id, ac).subscribe(
      res => {
        const { message } = res
        if (message == "Done") {
          this.getAllReports()
          this.load = false;
          this.sideError('Report Updated Successfully')
        }
      },
      err => {
        this.load = false;
        console.log(err);
        const { error } = err;
        this.sideError(error.err)
      }
    )
  }
}
