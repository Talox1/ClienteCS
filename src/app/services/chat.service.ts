import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, from } from 'rxjs';

import { API } from '../app-config'
const httpOptions2 = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token '+localStorage.getItem('token')
  })
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  api:string  = API;
  constructor(
    public wsService: WebsocketService, private http:HttpClient   //obtinene todos los recursos de client
  ) { }

  login(params: string):Observable<any> {
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.post(`${this.api}login/`,params, httpOptions);
  }

  postMethod(params: string):Observable<any> {
    // console.log(params);
    return this.http.post(`${this.api}alumno/lista/`,params, httpOptions2);
  }
  
  getMethod():Observable<any> {
    return this.http.get(`${this.api}alumno/lista/`,httpOptions2);
  }


  sendMessage(mensaje: string) {//recibe el nombre de quien esta emitiendo y el cuerpo(mensaje)
    const payload = {
      de: 'Roberto',
      cuerpo: mensaje
    };
    this.wsService.emit('mensaje', payload);//invocando la clase webservice y al metodo emit,
  }

  getMessages() {
    return this.wsService.listen('mensaje-nuevo');
  }

}
