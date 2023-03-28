import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  mark?:string
  model?:string
  yearsOld?:string
  typeOfVehicle?:string
  km?:string
  fuel?:string
  cubicasis?:string
  images?:any[]
  imagesSrc:any[]=[]
  price?:string
  drive?:string='Drive'
  gearbox?:string='Gearbox'
  numberOfDoors?:string
  numberOfSeets?:string

  carouselFlag?:boolean=true

  constructor(private sanitizer:DomSanitizer,
              private router:Router,
              private cookie:CookieService,
              private http:HttpClient) { }

  ngOnInit(): void {

  }

  upload(event:any):void{

    this.images=event.target.files

    for (let i = 0; i < event.target.files.length; i++) {

      const element = event.target.files[i]

      
      this.imagesSrc!![i]=this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(element))
      
    }
    this.carouselFlag=undefined
    console.log(this.images)

  }


  addOffer():void{
    var formData= new FormData()


    formData.append("mark",this.mark!!)
    formData.append("model",this.model!!)
    formData.append("yearsOld",this.yearsOld!!)
    formData.append("typeOfVehicle",this.typeOfVehicle!!)
    formData.append("km",this.km!!)
    formData.append("fuel",this.fuel!!)
    formData.append("cubicasis",this.cubicasis!!)
    formData.append("price",this.price!!)
    formData.append("drive",this.drive!!)
    formData.append("gearbox",this.gearbox!!)
    formData.append("numberOfDoors",this.numberOfDoors!!)
    formData.append("numberOfSeets",this.numberOfSeets!!)

    console.log(formData.get("numberOfDoors"))
    console.log(formData.get("numberOfSeets"))

    for (let index = 0; index < this.images!!.length; index++) {
      const element = this.images!![index];
      formData.append("images",element)
    }
    

    let headers= new HttpHeaders().set("Authorization","Bearer "+this.cookie.get("token"))

    this.http.post(environment.apiUrl+"/car",formData,{headers:headers}).subscribe(flag=>{
      console.log(flag)
      this.router.navigate(['profile'])
    })

  }

}
