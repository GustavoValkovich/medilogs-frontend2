import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PacienteService } from '../../../../core/services/paciente.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.scss']
})
export class PacienteFormComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private pacienteService: PacienteService, public router: Router, private snack: MatSnackBar) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: [null, [Validators.required, Validators.min(0)]],
      dni: [''],
      obraSocial: [''],
      telefono: [''],
      email: ['', Validators.email],
      domicilio: ['']
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snack.open('Formulario inválido. Completa los campos requeridos.', 'Cerrar', { duration: 3000 });
      return;
    }

    const payload = this.form.value;
    console.log('Enviando createPaciente payload:', payload);
    this.pacienteService.createPaciente(payload).subscribe(() => {
      console.log('Paciente creado correctamente');
      this.snack.open('Paciente creado', 'Cerrar', { duration: 2000 });
      this.router.navigate(['/pacientes']);
    }, err => {
      console.error('Error al crear paciente:', err);
      const msg = err?.error?.message || err?.message || 'Error al crear paciente';
      this.snack.open(msg, 'Cerrar', { duration: 5000 });
    });
  }
}
