import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  @ViewChild('signUpForm', { static: false }) signUpForm!: NgForm;
  submitted: boolean;
  apiError: boolean;
  constructor(private _appService: AppService, private _router: Router) {
    this.submitted = false;
    this.apiError = false;
  }
  onSubmit(signupForm: NgForm) {
    this.submitted = true;
    this.apiError = false;
    if (signupForm.value) {
      let formData = signupForm.value;
      let requestObj = {
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        email: formData?.email
      };
      this._appService.sendSignupData(requestObj).subscribe(
        (response: any) => {
          if (response?._id) {
            this._router.navigateByUrl('home');
          }
        },
        (err) => {
          this.apiError = true;
        }
      );
    }
  }
}
