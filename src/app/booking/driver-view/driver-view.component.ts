import { Component, OnInit, OnDestroy  } from '@angular/core';
import { AppService } from './../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { from } from 'rxjs';

@Component({
  selector: 'app-driver-view',
  templateUrl: './driver-view.component.html',
  styleUrls: ['./driver-view.component.css']
})
export class DriverViewComponent implements OnInit, OnDestroy {
  authToken: string;
  userEmail: string;
  userInfo: any;

  constructor(public AppService: AppService, public toastr: ToastrManager, private _route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    console.log('on init called')
    this.authToken = Cookie.get('authToken');
    this.userInfo = this.AppService.getUserInfoFromLocalstorage();
    this.userEmail = Cookie.get('email')
    console.log("authToken" , this.authToken);
    //this.checkStatus();
  }

  public checkStatus: any = () => {

    console.log("check status called")

    if (Cookie.get('authToken')=== undefined || Cookie.get('authToken') === '' || Cookie.get('authToken') === null) { 
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }

  } // end checkStatus

  public logout: any = () =>{
    this.AppService.logout().subscribe((apiResponse) =>{
      if(apiResponse.status === 200){
        console.log("logout function called");
        Cookie.deleteAll();
        
        this.router.navigate(['/']);
      } else {
        this.toastr.errorToastr(apiResponse.message);
      }
    }, (err) =>{
      this.toastr.errorToastr("some error occured");
    })
  }

  ngOnDestroy() {

  }
}
