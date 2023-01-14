import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // leftPic = "../../assets/imgs/"
  // rightPic = "../../assets/imgs/old-homeless-man-wearing-sweater-blanket-sleeping-cardboard-seeking-help-hungry-food-beggar-people-walking-230181986-transformed.png"

  lat = 29.986358540343307;
  lng = 31.26789936670175;
  link: any = "";
  count: any = 0;
  errorMessage: boolean = false;
  emailGlobal: String = ''
  message: String = '';
  loginError: boolean = false;
  loginErrorMessage: any;
  load: boolean = false;
  load2: boolean = false;
  sideMessage: string = "";

  sideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-100%" })
    }, 3000);
  }
  
  constructor(private _UserService: UserService, public _Router: Router) {
    localStorage.clear();
  }
  backLogin() {
    $(".secondForm").fadeOut(500);
    $(".firstForm").delay(500).fadeIn();

  }
  ngOnInit(): void {

    $('.roSignup').click(() => {
      $(".signinPart").fadeOut(500);
      $('.signHead').fadeOut(500)
      $(".signupPart").delay(500).fadeIn();
    })
    $('.roSign').click(() => {
      $(".signupPart").fadeOut(500);
      $('.signHead').delay(500).fadeIn();

      $(".signinPart").delay(500).fadeIn();
    })
    $(".FFLink").click(function () {
      $(".firstForm").fadeOut(500);
      $(".secondForm").delay(500).fadeIn();
    })
    $(".submitEmali").click(function () {
      $(".secondForm").fadeOut(500);
      $(".thirdForm").delay(500).fadeIn();
    })
    $(".submitCode").click(function () {
      $(".thirdForm").fadeOut(500);
      $(".forthForm").delay(500).fadeIn();
    })
  }
  //map
  mapCoords(event: any) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.link = `https://www.google.com/maps/search/?api=1&query=${this.lat},${this.lng}`
    // console.log(this.link);
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/), Validators.required])
  })

  handelSignIn() {
    this.load = true;
    let Data = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
    }
    this._UserService.signIn(Data).subscribe(data => {
      if (data.message == "Done") {
        this.load = false;
        //set token localStorage
        localStorage.setItem('token', data.token);
        //redirect homePage
        this._Router.navigateByUrl("/admin")
        //Navigate DashBored
        this.loginForm.reset();
      }
    },
      err => {
        this.load = false;
        this.loginError = true;
        const { message } = err.error
        console.log(err);
        if (message == 'invalid data') {
          this.loginErrorMessage = "In-valid data please enter valid data";
        } else if (message == "Not register user") {
          this.loginErrorMessage = "This user is not registered please signUp first";
        } else if (message == "pinding for  admin Aprove") {
          this.loginErrorMessage = "Pindling for  admin approval";
        } else if (message == "u have  to confirm u email First") {
          this.loginErrorMessage = "Please confirm your email";
        } else if (message == "invalid Password") {
          this.loginErrorMessage = "Please enter the correct password";
        } else {
          this.loginErrorMessage = `${message}`;
        }
      }
    )
  }


  signupForm = new FormGroup({
    userName: new FormControl('', [Validators.pattern(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/), Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    nationalID: new FormControl('', [Validators.minLength(14), Validators.maxLength(14), Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    role: new FormControl('Admin', [Validators.required]),
    password: new FormControl('', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/), Validators.required]),
    Cpassword: new FormControl('', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/), Validators.required])
  })


  handelSignUp() {
    this.load = true;
    // console.log(this.link.length)

    // if (this.link.length == 0 || !this.signupForm.valid) {
    //   this.load = false;

    //   this.loginError = true;
    //   this.loginErrorMessage = "Please pick  a location";
    // } else {

    let Data = {
      userName: this.signupForm.controls.userName.value,
      email: this.signupForm.controls.email.value,
      phone: this.signupForm.controls.phone.value,
      location: this.signupForm.controls.address.value,
      role: this.signupForm.controls.role.value,
      password: this.signupForm.controls.password.value,
      cPassword: this.signupForm.controls.Cpassword.value,
      nationalID: this.signupForm.controls.nationalID.value

    }
    console.log({ Data });
    this._UserService.signUp(Data).subscribe(data => {
      try {
        this.load = false;
        this.loginError = true;
        if (data.message == 'Done') {
          this.load2 = true;
          this.signupForm.reset();
        }
      } catch (error) {
        console.log({ error });
      }

    },
      err => {
        this.load = false;
        this.loginError = true;
        console.log(err);
        const { message } = err.error
        if (message == "Email exist") {
          this.loginErrorMessage = "Sorry this email already exists";
        } else {
          this.loginErrorMessage = "In-valid data please try again";
        }
      }
    )
  }

  closeLoad() {
    this.load2 = false
  }

  //forget password

  sendCode = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required])

  })
  getEmailToForget() {
    this.sendCode.controls.email.setValue(this.loginForm.controls.email.value);
    $('.signupPart').fadeOut(500)
    $('.signinPart').fadeOut(500)
    $('.SendCode').delay(500).fadeIn(200)
  }

  handelSendCode() {
    this.load = true;

    let data = { email: this.sendCode.controls.email.value }

    this._UserService.sendCode(data).subscribe(
      res => {
        console.log(res.message);
        this.load = false;
        const { message } = res
        if (message == 'Done') {
          this.activateForm.controls.email.setValue(this.sendCode.controls.email.value);
          $(".SendCode").fadeOut(500);
          $(".restPassword").delay(500).fadeIn();
        }
      },
      err => {
        const { message } = err.error
        this.load = false;
        this.loginError = true;
        if (message == 'in-valid user') {
          this.loginErrorMessage = "please Enter Valid Email";
        } else {
          this.loginErrorMessage = "Please enter valid data";
        }

      })
  }

  activateForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    code: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/), Validators.required]),
    cPassword: new FormControl('', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/), Validators.required])

  })



  activateForgetPasswordForm() {
    this.load = true;

    let data = {
      email: this.activateForm.controls.email.value,
      code: this.activateForm.controls.code.value,
      newPassword: this.activateForm.controls.password.value,
      cPassword: this.activateForm.controls.cPassword.value,

    }

    this._UserService.restForgetPassword(data).subscribe(
      res => {
        console.log(res);
        const { message } = res
        this.loginError = true;
        this.load = false;
        if (message == 'Done') {
          this.loginErrorMessage = "Password updated successfully";
          $(".restPassword").fadeOut(500);
          $(".signinPart").delay(500).fadeIn();
        }
      },
      err => {
        const { message } = err.error
        this.loginError = true;
        this.load = false;
        if (message == 'invalid code') {
          this.loginErrorMessage = "In-valid code";
        } else if (message == 'invalid user') {
          this.loginErrorMessage = "Please enter valid email ";
        } else {
          this.loginErrorMessage = "Please enter valid data ";
        }

      })
  }






}
