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
  teacherId:number;

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

    this.alumnoService.getMethod().subscribe(
      response =>{
        console.log(response);
      }
    )
  }

  guardar(){
    // console.log(this.name,this.ap_pat, this.ap_pat, this.email, this.direccion, this.genero);
    this.formPost = this.formBuilder.group({
      'name':[`${this.name}`],
      'ap_pat':[`${this.ap_pat}`],
      'ap_mat':[`${this.ap_mat}`],
      'edad':[`${this.edad}`],
      'address':[`${this.address}`],
      'genero':[`${this.genero}`],
      'teacher':[`${this.teacherId}`]
    })
    console.log(this.formPost.value);

    this.alumnoService.postMethod(this.formPost.value).subscribe(
      response =>{
        console.log(response);
      }
    );
  }

  update(){
    this.formPost = this.formBuilder.group({
      'name':[`${this.name}`],
      'ap_pat':[`${this.ap_pat}`],
      'ap_mat':[`${this.ap_mat}`],
      'edad':[`${this.edad}`],
      'address':[`${this.address}`],
      'genero':[`${this.genero}`],
      'teacher':[`${this.teacherId}`]
      
    })
    console.log(this.formPost.value);


    this.alumnoService.updateMethod(this.formPost.value, this.idAlumno).subscribe(
      response =>{
        console.log(response);
      }
    );
  }

  eliminar(){
    this.alumnoService.deletedMethod(this.idAlumno).subscribe(
      response => {
        console.log(response);
      }
    )
  }

  
}
