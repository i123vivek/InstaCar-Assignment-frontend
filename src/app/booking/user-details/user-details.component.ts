import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './../../app.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  firstName: any;
  mobileNumber: any;
  lastName: any;
  email: any;
  address: any;
  currentUserId: string;
 // public userDetailsFlag: boolean = false;

  constructor(public router: Router, public appService: AppService, public toastr: ToastrManager) { }

  ngOnInit() {
    this.currentUserId = Cookie.get('userId');
    if (this.currentUserId  === undefined || this.currentUserId  === '' || this.currentUserId  === null) {
      this.toastr.errorToastr('You are not a registered User');
    }

    this.getUserInfo(this.currentUserId);
  }

  public goToSignIn: any = () => {
    this.router.navigate(['/login']);
  }

  public getUserInfo: any = (userId) =>{
    this.appService.getSingleUserInformation(userId).subscribe((apiResponse) => {
      if (apiResponse.status === 200){
        console.log(apiResponse);

        this.firstName = apiResponse.firstName;
        this.lastName = apiResponse.lastName;
        this.mobileNumber = apiResponse.mobileNumber;
        this.email = apiResponse.email;
        this.address = apiResponse.address;
      }
      else {
        this.toastr.errorToastr(apiResponse.message)
      }
  
    }, (err) =>{
      this.toastr.errorToastr('some error occured')
    })
  }

  public confirmUserDetailsFunction: any = ()=>{
    //this.userDetailsFlag = true;
    if (!this.firstName) {
      this.toastr.warningToastr("please enter your firstName");
    }
    else if (!this.lastName) {
      this.toastr.warningToastr("please enter your lastName");
    }
    else if (!this.mobileNumber) {
      this.toastr.warningToastr("please enter your mobileNumber");
    }
    else if (!this.email) {
      this.toastr.warningToastr("please enter your email");
    }
    else if (!this.address) {
      this.toastr.warningToastr("please enter your address");
    }
    else {
      let currentUser = {
        firstName: this.firstName,
        lastName: this.lastName,
        mobileNumber: this.mobileNumber,
        email: this.email,
        address: this.address,
      }
      console.log("currentUser details is:",currentUser);
      if (this.email  !== Cookie.get('email')) {
        this.toastr.errorToastr('You are not a signedIn User Please SignIn');
        this.router.navigate(['/login']);
      }
      else{
        this.toastr.successToastr('wellcome to InstaCar, Please book driver');
        this.router.navigate(['/driver-view']);
      }
    }

  }

}
