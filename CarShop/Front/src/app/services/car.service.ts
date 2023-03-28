import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/Car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http:HttpClient,
    private cookie:CookieService) { }


    getCars():Observable<Car[]>{

      let headers= new HttpHeaders().set("Authorization","Bearer "+this.cookie.get("token"))
      return this.http.get<Car[]>(environment.apiUrl+"/car",{headers:headers})

    }

    getCar(_id:string):Observable<Car>{
      
      return this.http.get<Car>(environment.apiUrl+"/car/"+_id)
    }


    getMyCars():Observable<Car[]>{

      let headers= new HttpHeaders().set("Authorization","Bearer "+this.cookie.get("token"))
      return this.http.get<Car[]>(environment.apiUrl+"/car/myCars",{headers:headers})
    }


    addOffer(formData:FormData):Observable<boolean>{

        let headers= new HttpHeaders().set("Authorization","Bearer "+this.cookie.get("token")).set('Content-Type', 'multipart/form-data boundary=<calculated when request is sent>')

        return this.http.post<boolean>(environment.apiUrl+'/car',{

          formData
          
        },
        {headers:headers})

      }


  
    deleteAdvert(_id:string):Observable<boolean>{

      return this.http.delete<boolean>(environment.apiUrl+"/car/"+_id)

    }


}
