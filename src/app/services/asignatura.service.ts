import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, from } from 'rxjs';

import { API } from '../app-config';

const httpOptions2={
  headers : new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization':'Token '+localStorage.getItem('token')
  })
}
@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {
  api:string = API;
  constructor(public wsService: WebsocketService, private http:HttpClient) { }

  login(params: string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    return this.http.post(`${this.api}login/`,params, httpOptions)
  }

  postMethod(params: string):Observable<any> {
    // console.log(params);
    // console.log('get token: '+localStorage.getItem('token'));
    return this.http.post(`${this.api}asignatura/asignatura1/`,params, httpOptions2);
  }

  getMethod():Observable<any> {
    return this.http.get(`${this.api}asignatura/asignatura1/`,httpOptions2);
  }

  updateMethod(params: string, id:BigInteger):Observable<any>{
    return this.http.put(`${this.api}asignatura/asignatura1/${id}`,params, httpOptions2);
  }

  deletedMethod(id:BigInteger):Observable<any>{
    return this.http.delete(`${this.api}asignatura/asignatura1/${id}`,httpOptions2);
  }

}

