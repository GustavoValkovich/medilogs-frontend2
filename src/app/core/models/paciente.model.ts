export interface Paciente {
  id?: string | number;
  nombre: string;
  apellido: string;
  edad: number;
  dni?: string;
  obraSocial?: string;
  telefono?: string;
  email?: string;
  domicilio?: string;
}
