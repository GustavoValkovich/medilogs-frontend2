import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientesListComponent } from './components/pacientes-list/pacientes-list.component';
import { PacienteFormComponent } from './components/paciente-form/paciente-form.component';
import { HistoriaFormComponent } from './components/historia-form/historia-form.component';

const routes: Routes = [
  { path: '', component: PacientesListComponent },
  { path: 'nuevo', component: PacienteFormComponent },
  { path: ':id/historia', component: HistoriaFormComponent }
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class PacientesRoutingModule {}
