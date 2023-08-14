import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProvinciaService {
  private apiUrl: string = 'http://127.0.0.1:8000/api/provincias';

  constructor(private http: HttpClient) {}

  getProvince(page: number, itemsPerPage: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('itemsPerPage', itemsPerPage.toString());

    const url = `${this.apiUrl}`;
    return this.http
      .get<any>(url, { params })
      .pipe(map((response: any) => response['hydra:member']));
  }

  getProvinceId(id: number): Observable<any> {
    const params = id.toString();
    const url = `${this.apiUrl}/${params}`;
    return this.http.get<any>(url);
  }

  registerProvince(nombre: string): Observable<any> {
    const provincia = { nombre: nombre };
    return this.http.post<any>(this.apiUrl, provincia);
  }

  editarProvince(id: number, nombre: string): Observable<any> {
    const params = id.toString();
    const provincia = { nombre: nombre };
    const url = `${this.apiUrl}/${params}`;
    return this.http.put<any>(url, provincia);
  }

  eliminarProvincia(id: number): Observable<any> {
    const params = id.toString();
    const url = `${this.apiUrl}/${params}`;
    return this.http.delete<any>(url);
  }
}
