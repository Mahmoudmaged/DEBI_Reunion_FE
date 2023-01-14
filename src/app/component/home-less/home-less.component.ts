import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomelessService } from 'src/app/services/homeless.service';
import { ReportService } from 'src/app/services/report.service';
declare var $: any;
@Component({
  selector: 'app-home-less',
  templateUrl: './home-less.component.html',
  styleUrls: ['./home-less.component.scss']
})
export class HomeLessComponent implements OnInit {
  load: boolean = false;
  panelOpenState = false;
  responseData: any[] = [];

  sideMessage: string = ""
  sideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-100%" })
    }, 3000);
  }

  constructor(private _HomelessService: HomelessService, private _Router: Router) {
    this.getAllHomeless()
  }

  getAllHomeless() {
    this._HomelessService.getAllHomeless().subscribe(
      res => {
        this.responseData = res.homeLess;
      }, err => {
        console.log(err);
      })
  }
  ngOnInit(): void {
  }

  showReportDetails() {
  }
  Navigate(pathURl: string) {
    this._Router.navigateByUrl(`/${pathURl}`)
  }

  changeReportStatus(id: string, ac: string) {
    this.load = true;
    console.log({ id, ac });

    this._HomelessService.changeHomelessStatus(id, ac).subscribe(
      res => {
        const { message } = res
        if (message == "Done") {
          this.getAllHomeless()
          this.load = false;
          this.sideError('Homeless Updated Successfully')
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
