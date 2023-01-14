import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  sideMessage: string = ""
  sideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-100%" })
    }, 3000);
  }
  constructor(private _Router: Router) { }

  ngOnInit(): void {
  }
  Navigate(pathURl: string) {
    this._Router.navigateByUrl(`/${pathURl}`)
  }

}
