import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'
declare var $: any;
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  lat = 29.986358540343307;
  lng = 31.26789936670175;
  link: any = "";
  errorMessage: boolean = false;
  message: String = '';
  loginError: boolean = false;
  loginErrorMessage: any;
  load:boolean= false;
  sideMessage: string = ""
  sideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-100%" })
    }, 3000);
  }
  constructor(private _UserService: UserService, private _Router: Router) { }


  ngOnInit(): void {
    $(".loginLink").click(function () {
      $(".loginPass").fadeOut(500);
      $(".logBtn").fadeOut(500);
      $(".FPParag").delay(500).fadeIn();
      $(".FPBtn").delay(500).fadeIn();
    })
    $(".loginLink").click(function () {
      $(".loginPass").fadeOut(500);
      $(".inplogdiv").delay(500).fadeIn();
      $(".logsign").delay(500).animate({ width: "100%%" }, 0);
    })
    $(".rightsign").click(function () {
      $(".inplogdiv").fadeOut(500);
      $(".inpsigndiv").delay(500).fadeIn();
    })
  }


  mapCoords(event: any) {
    console.log(event);
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.link = `https://www.google.com/maps/search/?api=1&query=${this.lat},${this.lng}`
    this.signUpForm.controls.location.setValue(this.link);
    console.log(this.link);


  }


  signUpForm = new FormGroup({
    userName: new FormControl('', [Validators.pattern(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/), Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    phone: new FormControl('', [Validators.required , Validators.pattern(/^01[0125][0-9]{8}/)]),
    location: new FormControl('', [Validators.required]),
    role: new FormControl('policeStation', [Validators.required]),
    password: new FormControl('', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/), Validators.required]),
    Cpassword: new FormControl('', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/), Validators.required])

  })



  handelSignUp() {
    this.load= true;
    console.log(this.link.length)

    if (this.link.length == 0 || !this.signUpForm.valid) {
      this.load= false;

      this.loginError = true;
      this.loginErrorMessage = "Please pick  a location";
    } else {
         
      let Data = {
        userName: this.signUpForm.controls.userName.value,
        email: this.signUpForm.controls.email.value,
        phone: this.signUpForm.controls.phone.value,
        location: this.link,
        role: this.signUpForm.controls.role.value,
        password: this.signUpForm.controls.password.value,
        Cpassword: this.signUpForm.controls.Cpassword.value

      }

      this._UserService.signUp(Data).subscribe(data => {
        
        console.log(data.message);

        if (data.message == "email Exist") {
          this.load= false;
          this.loginError = true;
          this.loginErrorMessage = "Sorry this email already exists";
        } else if (data.message == 'user  registerd successfully') {
          this.load= false;

          this.loginError = true;
          this.loginErrorMessage = "User  registerd successfully";
          this._Router.navigateByUrl('');
          this.signUpForm.reset();

        } else {
          this.load= false;

          this.loginError = true;
          this.loginErrorMessage = "In-valid data please try again";
        }
      })
    }
  }

}
