import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Paciente } from '../../../../core/models/paciente.model';
import { PacienteService } from '../../../../core/services/paciente.service';

@Component({
  selector: 'app-pacientes-list',
  templateUrl: './pacientes-list.component.html',
  styleUrls: ['./pacientes-list.component.scss']
})
export class PacientesListComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'edad', 'obraSocial', 'acciones'];
  dataSource = new MatTableDataSource<Paciente>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filtroNombre = '';
  filtroApellido = '';
  filtroEdad: number | null = null;
  filtroObra = '';

  constructor(private pacienteService: PacienteService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.pacienteService.getPacientes().subscribe(list => {
      this.dataSource.data = list;
      setTimeout(() => {
        if (this.paginator) this.dataSource.paginator = this.paginator;
        if (this.sort) this.dataSource.sort = this.sort;
      });
    });
  }

  aplicarFiltros() {
    const nombre = (this.filtroNombre || '').trim().toLowerCase();
    const apellido = (this.filtroApellido || '').trim().toLowerCase();
    const edad = this.filtroEdad;
    const obra = (this.filtroObra || '').trim().toLowerCase();

    this.dataSource.filterPredicate = (data: Paciente, filter: string) => {
      const matchNombre = nombre ? data.nombre.toLowerCase().includes(nombre) : true;
      const matchApellido = apellido ? data.apellido.toLowerCase().includes(apellido) : true;
      const matchEdad = edad != null ? data.edad === edad : true;
      const matchObra = obra ? (data.obraSocial || '').toLowerCase().includes(obra) : true;
      return matchNombre && matchApellido && matchEdad && matchObra;
    };

    this.dataSource.filter = Math.random().toString();
  }

  limpiarFiltros() {
    this.filtroNombre = '';
    this.filtroApellido = '';
    this.filtroEdad = null;
    this.filtroObra = '';
    this.aplicarFiltros();
  }

  nuevoPaciente() {
    this.router.navigate(['/pacientes/nuevo']);
  }

  seleccionar(p: Paciente) {
    if (!p.id) return;
    this.router.navigate(['/pacientes', p.id, 'historia']);
  }
}
