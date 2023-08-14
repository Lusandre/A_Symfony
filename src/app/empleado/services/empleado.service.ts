import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Empleado } from 'src/app/interface/empleado.interface';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  empleados: Empleado[] = [];
  private apiUrl: string = 'http://127.0.0.1:8000/api/empleados';
  constructor(private http: HttpClient) {}
  getEmpleados(page: number, itemsPerPage: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('itemsPerPage', itemsPerPage.toString());

    const url = `${this.apiUrl}`;
    return this.http
      .get<any>(url, { params })
      .pipe(map((response: any) => response['hydra:member']));
  }
  getEmpleadoId(id: number): Observable<any> {
    const params = id.toString();
    const url = `${this.apiUrl}/${params}`;
    return this.http.get<any>(url);
  }
  eliminarEmpleado(id: number): Observable<any> {
    const params = id.toString();
    const url = `${this.apiUrl}/${params}`;
    return this.http.delete<any>(url);
  }
  registerEmpleado(empleado: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, empleado);
  }
  editarEmpleado(id: number, empleado: any): Observable<any> {
    const params = id.toString();
    const url = `${this.apiUrl}/${params}`;
    return this.http.put<any>(url, empleado);
  }
  addCentro(id: number, centros: any[]): Observable<any> {
    const params = id.toString();
    const url = `${this.apiUrl}/${params}`;
    return this.http.put<any>(url, { idCentroTrabajo: centros });
  }
  getCentrosDeEmpleado(id: number, page: number, itemsPerPage: number) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('itemsPerPage', itemsPerPage.toString());
    const empleadoId = id.toString();
    const url = `${this.apiUrl}/${empleadoId}/id_centro_trabajos`;

    return this.http
      .get<any>(url, { params })
      .pipe(map((response: any) => response['hydra:member']));
  }
}
