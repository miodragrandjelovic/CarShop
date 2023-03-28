import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email?:string
  password?:string
  flag?:boolean

  constructor(private router:Router,
              private authService:AuthService,
              private cookie:CookieService) { }

  ngOnInit(): void {
  }

  login():void{

    this.authService.login(this.email!!,this.password!!).subscribe(token=>{

        this.cookie.set("token",token.token)
        this.router.navigate(['home'])

    },
    err=>{

      this.flag=true

    })


  }

}
