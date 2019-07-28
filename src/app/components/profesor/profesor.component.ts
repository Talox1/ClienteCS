import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfesorService } from 'src/app/services/profesor.service';
@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {
  name:string;
  ap_pat:string;
  ap_mat:string;
  edad:BigInteger;
  correo:string;
  address:string;
  genero:string;
  asignatureId:number;
  idProfesor=1;

  formPost: FormGroup;
  formLogin: FormGroup;
  constructor(public profesorService: ProfesorService, private formBuilder : FormBuilder) { 

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
      'asignature':[''],
    })
  }

  ngOnInit() {
    this.profesorService.login(this.formLogin.value).subscribe(
      response =>{
        console.log(response);
        localStorage.setItem('token',response.token);
        // console.log('set token: '+localStorage.getItem('token'));
      }
    );
    
    this.profesorService.getMethod().subscribe(
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
      'asignature':[`${this.asignatureId}`]
    })
    console.log(this.formPost.value);

    this.profesorService.postMethod(this.formPost.value).subscribe(
      response =>{
        console.log(response);
      }
    )
  }

  update(){
    this.formPost = this.formBuilder.group({
      'name':[`${this.name}`],
      'ap_pat':[`${this.ap_pat}`],
      'ap_mat':[`${this.ap_mat}`],
      'edad':[`${this.edad}`],
      'address':[`${this.address}`],
      'genero':[`${this.genero}`],
      'asignature':[`${this.asignatureId}`]
      
    })
    console.log(this.formPost.value);


    this.profesorService.updateMethod(this.formPost.value, this.idProfesor).subscribe(
      response =>{
        console.log(response);
      }
    );
  }

  eliminar(){
    this.profesorService.deletedMethod(this.idProfesor).subscribe(
      response => {
        console.log(response);
      }
    )
  }
}
