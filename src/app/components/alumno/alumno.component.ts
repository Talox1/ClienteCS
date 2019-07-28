import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  name:string;
  ap_pat:string;
  ap_mat:string;
  edad:BigInteger;
  correo:string;
  address:string;
  genero:string;
  assignatureId:number;
  idAlumno=1;

  formPost: FormGroup;
  formLogin: FormGroup;

  constructor(public alumnoService:AlumnoService, private formBuilder: FormBuilder) { 
    this.formLogin = this.formBuilder.group({
      'username':['admin'],
      'password':['8552907642aa']
    })
    
    this.formPost = this.formBuilder.group({
      'name':[''],
      'ap_pat':[''],
      'ap_mat':[''],
      'edad':[''],
      'correo':[''],
      'address':[''],
      'genero':[''],
      'teacher':[''],
    })
  }

  ngOnInit() {
  this.alumnoService.login(this.formLogin.value).subscribe(
    response =>{
      localStorage.setItem('token',response.token)
    }
  )
  
  }

  
}
