import { Component, OnInit , OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './../../app.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-booking-dashboard',
  templateUrl: './booking-dashboard.component.html',
  styleUrls: ['./booking-dashboard.component.css']
})
export class BookingDashboardComponent implements OnInit,OnDestroy {
 
  originAddress: any;
  destinationAddress: any;
  departureDate: any;
  returnDate: any;
  //public bookingDetailsFlag: boolean = false;


  constructor(public router: Router, public appService: AppService, public toastr: ToastrManager) { }

  ngOnInit() {
    Cookie.set('bookingFlag','false');
  }

  public goToSignIn: any = () => {
    this.router.navigate(['/login']);
  }

  public saveBookingData: any = () =>{
    if(!this.originAddress){
      this.toastr.warningToastr('enter originAddress')
    }
    else if (!this.destinationAddress) {
      this.toastr.warningToastr('enter destination address')
    }
    else if (!this.departureDate) {
      this.toastr.warningToastr('enter departure date')
    }
    else if (!this.returnDate) {
      this.toastr.warningToastr('enter return date')
    }
    else {
      let data = {
        originAddress: this.originAddress,
        destinationAddress: this.destinationAddress,
        departureDate: this.departureDate,
        returnDate: this.returnDate
      }

      //this.bookingDetailsFlag = true;

      console.log("booking data entered is:",data);

      Cookie.set('originAddress', this.originAddress);
      Cookie.set('bookingFlag','true');
      Cookie.set('destinationAddress', this.destinationAddress);
      Cookie.set('departureDate', this.departureDate);
      Cookie.set('returnDate', this.returnDate);
     
      this.router.navigate(['/userDetails']); 

    } 
  }

  ngOnDestroy(): void {
    let flag = Cookie.get('bookingFlag')

    if (flag !== 'true')
    {
      Cookie.delete('bookingFlag')
      Cookie.delete('destinationAddress')
      Cookie.delete('departureDate')
      Cookie.delete('returnDate')
      Cookie.delete('originAddress')
    } 
   console.log("booked view destroyed");
  }
 

  
}
