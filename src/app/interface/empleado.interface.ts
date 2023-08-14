export interface Empleado {
  nombre: string;
  apellido1: string;
  apellido2: string;
  dni: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  fechaNacimiento: string;
  provincia: string; // Cambiado a tipo string para representar un IRI
  idCentroTrabajo?: string[];
  id?: number;
  '@id': string;
}
