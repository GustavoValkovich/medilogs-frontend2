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

  constructor(private fb: FormBuilder, private pacienteService: PacienteService, private router: Router, private snack: MatSnackBar) {}

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
    if (this.form.invalid) return;
    this.pacienteService.createPaciente(this.form.value).subscribe(() => {
      this.snack.open('Paciente creado', 'Cerrar', { duration: 2000 });
      this.router.navigate(['/pacientes']);
    }, err => {
      this.snack.open('Error al crear paciente', 'Cerrar', { duration: 3000 });
    });
  }
}
