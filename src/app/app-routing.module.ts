import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { ProfesorComponent } from './components/profesor/profesor.component';
import { MateriaComponent } from './components/materia/materia.component';
import { HomeComponent } from './components/home/home.component';
const appRoutes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'alumno',
    component: AlumnoComponent
  },
  {
    path:'profesor',
    component:ProfesorComponent
  },
  {
    path:'asignatura',
    component: MateriaComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
