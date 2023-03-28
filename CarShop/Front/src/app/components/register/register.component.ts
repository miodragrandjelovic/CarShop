import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  email?:string
  name?:string
  mobile_number?:string
  city?:string
  password?:string
  repeat_password?:string

  flag1?:boolean
  flag2?:boolean
  flag3?:boolean

  constructor(private router:Router,
              private authService:AuthService) { }

  ngOnInit(): void {
  }


  register():void{

    if(!this.email || !this.name || !this.mobile_number || !this.city || !this.password || !this.repeat_password)
    {
      this.flag1=true
      this.flag2=undefined
      this.flag3=undefined
    }

    else if(this.password!=this.repeat_password)
    {
      this.flag2=true
      this.flag1=undefined
      this.flag3=undefined
    }
    else
    {
      this.flag1=undefined
      this.flag2=undefined
      
      this.authService.register(this.email!!,this.name!!,this.mobile_number!!,this.city!!,this.password!!).subscribe(flag=>{

        if(flag==true)
          this.router.navigate(['login'])
        else
          this.flag3=true

      })


    }


  }

}
