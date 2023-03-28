import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Car } from 'src/app/models/Car';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


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

    this.carService.getCars().subscribe(cars=>{
      this.cars=cars
    })

  }

  advert(_id:string):void{

    this.router.navigate(['advert/'+_id])

  }

  logout():void{
    this.cookie.delete("token")
    this.router.navigate([""])
  }



}
