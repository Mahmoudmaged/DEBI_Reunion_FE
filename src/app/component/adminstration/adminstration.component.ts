import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomelessService } from 'src/app/services/homeless.service';
import { ReportService } from 'src/app/services/report.service';
import { UserService } from 'src/app/services/user.service';
declare var $: any;
@Component({
  selector: 'app-adminstration',
  templateUrl: './adminstration.component.html',
  styleUrls: ['./adminstration.component.scss']
})
export class AdminstrationComponent implements OnInit {
  hideToggleL: boolean = true;
  load: boolean = false;
  existMessage: String = ""
  errorMessage: any;
  iconList: any;
  images: any;
  userData: any = {}
  reportList: any = []
  homeLess: any = []
  userList: any = []
  linksArr: any = [{
    title: "facebook"
  }]
  decoded: any;
  BASEURL: any = 'https://nfc-linkit-npshgh3j5-mahmoudmaged.vercel.app'
  avatar: String = '../../../assets/images/avatar/Avatar-No-Background.png'
  sideMessage: string = ""
  sideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-100%" })
    }, 3000);
  }

  // BASEURL: any = `http://localhost:3000`;
  shareLink: any = `${this.BASEURL}/user/profile/`;
  constructor(private _ReportService: ReportService,
    private _HomelessService: HomelessService,
    private el: ElementRef,
    private _UserService: UserService, public _Router: Router) {
    this.profileData()
    this.reportData()
    this.homelessData()

  }

  ngOnInit(): void {


  }


  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }
  changeColor(di: any) {

  }

  Navigate(pathURl: string) {
    this._Router.navigateByUrl(`/${pathURl}`)
  }


  profileData(): any {
    this._UserService.profile().subscribe(
      res => {
        const { message, user } = res;
        if (message == "Done") {
          console.log(user);
          return this.userData = user
        }
      },
      err => {
        console.log(err);

      }
    )
  }

  reportData(): any {
    this._ReportService.getAllReport().subscribe(
      res => {
        const { message, report } = res;
        if (message == "Done") {
          return this.reportList = report
        }
      },
      err => {
        console.log(err);

      }
    )
  }


  homelessData(): any {
    this._HomelessService.getAllHomeless().subscribe(
      res => {
        const { message, homeLess } = res;
        if (message == "Done") {
          return this.homeLess = homeLess
        }
      },
      err => {
        console.log(err);

      }
    )
  }
}
