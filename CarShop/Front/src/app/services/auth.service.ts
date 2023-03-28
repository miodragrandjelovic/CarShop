import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDTO } from '../models/DTO/userDTO';
import { Token } from '../models/Token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,
              private cookie:CookieService) { }

  register(email:string,name:string,mobile_number:string,city:string,password:string):Observable<boolean>{

    return this.http.post<boolean>(environment.apiUrl+"/auth/register",{

      email:email,
      name:name,
      mobile_number:mobile_number,
      city:city,
      password:password

    })
  }


  login(email:string,password:string):Observable<Token>{

    return this.http.post<Token>(environment.apiUrl+"/auth/login",{
      email:email,
      password:password
    })

  }


  validateJwt(token:string):Observable<boolean>{
    let headers= new HttpHeaders().set("Authorization","Bearer "+token)
    return this.http.post<boolean>("http://localhost:3000/auth/validate",{},{headers:headers})
  }

  getUser():Observable<UserDTO>{
    let headers= new HttpHeaders().set("Authorization","Bearer "+this.cookie.get("token"))
    return this.http.post<UserDTO>("http://localhost:3000/auth/getUser",{},{headers:headers})
  }




}
