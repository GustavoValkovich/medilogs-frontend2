import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Paciente } from '../models/paciente.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private base = environment.apiBase;

  constructor(private http: HttpClient) {}

  private authHeaders() {
    const token = localStorage.getItem('medilogs_token');
    if (token) {
      return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
    }
    return {};
  }

  getPacientes(): Observable<Paciente[]> {
    return this.http.get<any[]>(`${this.base}/patients`).pipe(
      map(list => list.map(p => this.normalizePacienteFromApi(p)))
    );
  }

  getPaciente(id: string | number): Observable<Paciente> {
    return this.http.get<any>(`${this.base}/patients/${id}`).pipe(
      map(p => this.normalizePacienteFromApi(p))
    );
  }

  createPaciente(data: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.base}/patients`, data);
  }

  createHistoria(pacienteId: string | number, historia: any): Observable<any> {
    // las consultas en el backend requieren autenticación; si existe token local lo enviamos
    return this.http.post(`${this.base}/consultations`, { pacienteId, ...historia }, this.authHeaders());
  }

  private normalizePacienteFromApi(api: any): Paciente {
    // Map common API fields to the frontend Paciente model with sensible fallbacks.
    const nombreCompleto: string | null = api.full_name || null;
    let nombre = '';
    let apellido = '';
    if (nombreCompleto) {
      const parts = nombreCompleto.trim().split(/\s+/);
      nombre = parts.shift() || '';
      apellido = parts.join(' ') || '';
    } else if (api.email) {
      // fallback to email local-part as nombre
      nombre = String(api.email).split('@')[0];
    }

    // Calculate age from birth_date if provided (ISO string), otherwise 0
    let edad = 0;
    if (api.birth_date) {
      const bd = new Date(api.birth_date);
      if (!isNaN(bd.getTime())) {
        const diff = Date.now() - bd.getTime();
        edad = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      }
    }

    return {
      id: api.id,
      nombre,
      apellido,
      edad,
      dni: api.document || api.dni || undefined,
      obraSocial: api.insurance || api.obraSocial || undefined,
      telefono: api.phone || api.telefono || undefined,
      email: api.email || undefined,
      domicilio: api.city || api.domicilio || undefined
    } as Paciente;
  }
}
