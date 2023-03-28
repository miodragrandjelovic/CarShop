import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Car } from 'src/app/models/Car';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.css']
})
export class AdvertComponent implements OnInit {

  name?:string
  pomNumber?:string
  number:string="Click to see a number" 
  car?:Car
  images?:string[]
  drive?:string
  gearbox?:string
  header:string=""
  
  constructor(private authService:AuthService,
              private carService:CarService,
              private route: ActivatedRoute,
              private router:Router,
              private cookie:CookieService) { }

  ngOnInit(): void {

    this.authService.getUser().subscribe(userDTO=>{
      this.name=userDTO.name
      this.pomNumber=userDTO.number
    })

    this.route.params.subscribe(params=>{
      this.carService.getCar(params['id']).subscribe(car=>{
        this.car=car
        this.images = car.images

        this.header=car.mark+" "+car.model

        if(car.gearbox==0)
          this.gearbox="Manual"
        else
          this.gearbox="Automatic"
        
        if(car.drive==0)
          this.drive="Front wheel drive"
        else if(car.drive==1)
          this.drive="Rear wheel drive"
        else
          this.drive= "All wheel drive"

      })
    })
    

  }


  showNumber():void{
    this.number=this.pomNumber!!
  }

  logout():void{
    this.cookie.delete("token")
    this.router.navigate([""])
  }


}
