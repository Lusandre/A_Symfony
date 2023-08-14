import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CentrosTrabajo } from 'src/app/interface/centros-trabajo.interface';

@Injectable({
  providedIn: 'root',
})
export class CentrosTrabajoService {
  private apiUrl: string = 'http://127.0.0.1:8000/api/centros_trabajos';
  constructor(private http: HttpClient) {}
  getCentrosTrabajo(page: number, itemsPerPage: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('itemsPerPage', itemsPerPage.toString());

    const url = `${this.apiUrl}`;
    return this.http
      .get<any>(url, { params })
      .pipe(map((response: any) => response['hydra:member']));
  }
  getCentroTrabajoId(id: number): Observable<any> {
    const params = id.toString();
    const url = `${this.apiUrl}/${params}`;
    return this.http.get<any>(url);
  }
  registerCentroTrabajo(centroTrabajo: CentrosTrabajo): Observable<any> {
    return this.http.post<any>(this.apiUrl, centroTrabajo);
  }
  eliminarCentroTrabajo(id: number): Observable<any> {
    const params = id.toString();
    const url = `${this.apiUrl}/${params}`;
    return this.http.delete<any>(url);
  }
  editarCentroTrabajo(id: number, centroTrabajo: any): Observable<any> {
    const params = id.toString();
    const url = `${this.apiUrl}/${params}`;
    return this.http.put<any>(url, centroTrabajo);
  }
  addEmpleado(id: number, empleados: any[]): Observable<any> {
    const params = id.toString();
    const url = `${this.apiUrl}/${params}`;
    return this.http.put<any>(url, { idEmpleado: empleados });
  }
  getEmpleadosoDeCentros(id: number, page: number, itemsPerPage: number) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('itemsPerPage', itemsPerPage.toString());
    const centroId = id.toString();
    const url = `${this.apiUrl}/${centroId}/id_empleados`;

    return this.http
      .get<any>(url, { params })
      .pipe(map((response: any) => response['hydra:member']));
  }
}
