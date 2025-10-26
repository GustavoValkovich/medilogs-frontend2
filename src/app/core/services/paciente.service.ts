import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    return this.http.get<Paciente[]>(`${this.base}/patients`);
  }

  getPaciente(id: string | number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.base}/patients/${id}`);
  }

  createPaciente(data: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.base}/patients`, data);
  }

  createHistoria(pacienteId: string | number, historia: any): Observable<any> {
    // las consultas en el backend requieren autenticación; si existe token local lo enviamos
    return this.http.post(`${this.base}/consultations`, { pacienteId, ...historia }, this.authHeaders());
  }
}
