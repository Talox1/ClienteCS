import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsignaturaService } from 'src/app/services/asignatura.service';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {
  name:string;
  horario:string

  id:BigInteger;

  formPost: FormGroup;
  formLogin: FormGroup;
  constructor(public asignaturaService: AsignaturaService, private formBuilder : FormBuilder) { 
  
    this.formLogin = this.formBuilder.group({
      'username':['admin'],
      'password':['8552907642aa']
    });

    this.formPost = this.formBuilder.group({
      'name':[''],
      'horario':['']
    });
    
  }

  ngOnInit() {
    this.asignaturaService.login(this.formLogin.value).subscribe(
      response =>{
        console.log(response);
        localStorage.setItem('token',response.token);
        // console.log('set token: '+localStorage.getItem('token'));
      }
    );
  
    this.asignaturaService.getMethod().subscribe(
      response =>{
        console.log(response);
      }
    )
  }

  guardar(){
    this.formPost = this.formBuilder.group({
      'name':[`${this.name}`],
      'horario':[`${this.horario}`]
    });

    this.asignaturaService.postMethod(this.formPost.value).subscribe(
      response =>{
        console.log('posteando'+response);
      }
    )
  }
  

}
