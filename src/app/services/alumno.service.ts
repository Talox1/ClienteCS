import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, from } from 'rxjs';

import { API } from '../app-config';

const httpOptions2 = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token '+localStorage.getItem('token')
  })
}
@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  api:string  = API;

  constructor(public wsService: WebsocketService, private http:HttpClient) { }
  
  login(params: string):Observable<any>{
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.post(`${this.api}login/`, params, httpOptions);
  }
  
  getMethod():Observable<any> {
    return this.http.get(`${this.api}alumno/alumno1/`,httpOptions2);
  }
  postMethod(params: string):Observable<any> {
    // console.log(params);
    // console.log('get token: '+localStorage.getItem('token'));
    return this.http.post(`${this.api}alumno/alumno1/`,params, httpOptions2);
  }

  updateMethod(params: string, id:number):Observable<any>{
    return this.http.put(`${this.api}alumno/alumno1detail/${id}`,params, httpOptions2);
  }

  deletedMethod(id:number):Observable<any>{
    return this.http.delete(`${this.api}alumno/alumno1detail/${id}`,httpOptions2);
  }
}
