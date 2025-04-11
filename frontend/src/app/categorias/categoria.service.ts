import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = 'http://localhost:8081/categorias/estoque-total'; 
  constructor(private http: HttpClient) { }

 
  getEstoquePorCategoria(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
