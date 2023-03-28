import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Car } from 'src/app/models/Car';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  @ViewChild('closePopup') closePopup?: ElementRef<HTMLElement>;

  name?:String 
  cars?:Car[]

  constructor(private authService:AuthService,
    private carService:CarService,
    private router:Router,
    private cookie:CookieService) { }

  ngOnInit(): void {
  
    this.authService.getUser().subscribe(name=>{
      this.name=name.name
    })

    this.carService.getMyCars().subscribe(cars=>{
      this.cars=cars
    })

  }

  advert(_id:string):void{

    this.router.navigate(['advert/'+_id])

  }

  deleteAdvert(_id:string):void{

    console.log(_id)
    this.carService.deleteAdvert(_id).subscribe(flag=>{
      if(flag)
      {

        let el: HTMLElement = this.closePopup!!.nativeElement;
        el.click();
        this.carService.getMyCars().subscribe(cars=>{
          this.cars=cars
        })
      }
    })


  }

  logout():void{
    this.cookie.delete("token")
    this.router.navigate([""])
  }


}
