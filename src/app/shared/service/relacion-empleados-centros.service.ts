import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RelacionEmpleadosCentrosService {
  private apiUrl: string = 'http://127.0.0.1:8000/api/empleados';
  private apiUrl2: string = 'http://127.0.0.1:8000/api/centros_trabajos';
  constructor(private http: HttpClient) {}

  editarEmpleado(
    idEmpleado: number,
    idCentroTrabajo: number,
    empleado: any,
    centrosTrabajo: any
  ): Observable<any> {
    const idE = idEmpleado.toString();
    const idC = idCentroTrabajo.toString();
    const url = `${this.apiUrl}/${idE}`;
    const url2 = `${this.apiUrl}/${idC}`;
    this.http.put<any>(url2, empleado);
    return this.http.put<any>(url, empleado);
  }
}
