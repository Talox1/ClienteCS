import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto: string;
  mensajesSubscription: Subscription
  mensajes: any[] = [];
  elemento: HTMLElement;
  formLogin: FormGroup;
  formPost: FormGroup;
  
  constructor(
    public chatService: ChatService, private formBuilder : FormBuilder
  ) { 
    this.formLogin = this.formBuilder.group({
      'username':['admin'],
      'password':['8552907642aa']
    })

    this.formPost = this.formBuilder.group({
      'name':['Carlos'],
      'ap_pat':['PeRamirezrez'],
      'ap_mat':['Sanchez'],
      'year':['1991'],
    })
  }

  ngOnInit() {
    // console.log(this.formLogin.value)
    this.chatService.login(this.formLogin.value).subscribe(
      response =>{
        console.log(response);
        localStorage.setItem('token',response.token);
      }
    )

      this.chatService.postMethod(this.formPost.value).subscribe(
        response => {
          console.log(response);
        }
      )

    this.chatService.getMethod().subscribe(
      response =>{
        console.log(response)
      }
    )
    this.elemento = document.getElementById('chat-mensajes')
    this.mensajesSubscription = this.chatService.getMessages().subscribe(msg => {
      this.mensajes.push(msg);
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    });
  }

  ngOnDestroy() {
    this.mensajesSubscription.unsubscribe();
  }
  enviar() {
    if (this.texto.trim().length === 0) {
      return;
    }
    console.log(this.texto+'...');
    this.chatService.sendMessage(this.texto);
    this.texto = '';
  }

}
