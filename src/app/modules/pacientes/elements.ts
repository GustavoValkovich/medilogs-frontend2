import { createCustomElement } from '@angular/elements';
import { Injector } from '@angular/core';
import { PacientesListComponent } from './components/pacientes-list/pacientes-list.component';
import { PacienteFormComponent } from './components/paciente-form/paciente-form.component';
import { HistoriaFormComponent } from './components/historia-form/historia-form.component';

export function definePacientesElements(injector: Injector) {
  const listEl = createCustomElement(PacientesListComponent, { injector });
  const formEl = createCustomElement(PacienteFormComponent, { injector });
  const histEl = createCustomElement(HistoriaFormComponent, { injector });

  if (!customElements.get('medilogs-pacientes')) customElements.define('medilogs-pacientes', listEl);
  if (!customElements.get('medilogs-paciente-form')) customElements.define('medilogs-paciente-form', formEl);
  if (!customElements.get('medilogs-historia-form')) customElements.define('medilogs-historia-form', histEl);
}
