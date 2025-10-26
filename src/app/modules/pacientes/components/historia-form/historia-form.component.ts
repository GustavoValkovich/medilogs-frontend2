import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacienteService } from '../../../../core/services/paciente.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-historia-form',
  templateUrl: './historia-form.component.html',
  styleUrls: ['./historia-form.component.scss']
})
export class HistoriaFormComponent implements OnInit {
  pacienteId!: string | number;
  form!: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private pacienteService: PacienteService, private snack: MatSnackBar, public router: Router) {}

  ngOnInit(): void {
    this.pacienteId = this.route.snapshot.paramMap.get('id') || '';
    this.form = this.fb.group({
      motivo: ['', Validators.required],
      diagnostico: [''],
      tratamiento: [''],
      observaciones: [''],
      fecha: [new Date().toISOString().slice(0,10)]
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.pacienteService.createHistoria(this.pacienteId, this.form.value).subscribe(() => {
      this.snack.open('Historia guardada', 'Cerrar', { duration: 2000 });
      this.router.navigate(['/pacientes']);
    }, err => {
      this.snack.open('Error al guardar historia', 'Cerrar', { duration: 3000 });
    });
  }
}
