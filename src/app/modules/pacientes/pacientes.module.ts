import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesListComponent } from './components/pacientes-list/pacientes-list.component';
import { PacienteFormComponent } from './components/paciente-form/paciente-form.component';
import { HistoriaFormComponent } from './components/historia-form/historia-form.component';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  declarations: [PacientesListComponent, PacienteFormComponent, HistoriaFormComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, PacientesRoutingModule, MaterialModule]
})
export class PacientesModule {}
