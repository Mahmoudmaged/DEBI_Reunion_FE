import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomelessService } from 'src/app/services/homeless.service';
import { ReportService } from 'src/app/services/report.service';
import { UserService } from 'src/app/services/user.service';
declare var $: any;
@Component({
  selector: 'app-display-match-result',
  templateUrl: './display-match-result.component.html',
  styleUrls: ['./display-match-result.component.scss']
})
export class DisplayMatchResultComponent implements OnInit {

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

  constructor(public _ActivatedRoute: ActivatedRoute,
    private _UserService: UserService,
    private _ReportService: ReportService,
    private _HomelessService: HomelessService,
    public _Router: Router) {
      this.handelGetHomeless()

  }

  ngOnInit(): void {
  }



  homeless: any = {}
  handelGetHomeless() {

    this.load = true;

    this._HomelessService.getMatchedById(this._ActivatedRoute.snapshot.paramMap.get('id')).subscribe(
      res => {
        const { message, homeless } = res
        this.load = false;
        if (message == "Done") {
          this.homeless = homeless
          return this.homeless
        }
      },
      err => {
        this.load = false;
        const { error } = err
        this.sideError(error.err)
      }
    )
  }


  navigate(ac: string) {
    this._Router.navigateByUrl(`/${ac}`)
  }
}






