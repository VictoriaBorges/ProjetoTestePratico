import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Produto } from '../models/produto';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'http://localhost:8081/produtos';
  private categoriaUrl = 'http://localhost:8081/categorias';

  constructor(private http: HttpClient) {}

  
  getProdutos(): Observable<Produto[]> {
    return this.http.get<{ content: Produto[] }>(this.apiUrl).pipe(
      map(resposta => resposta.content)
    );
  }

  
  deletarProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  
  criarProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  
  atualizarProduto(id: number, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}/${id}`, produto);
  }

  
  getProdutoById(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }
  
  getEstoquePorCategoria(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categorias/estoque-total`);
  }
  
getTodosProdutos(): Observable<Produto[]> {
  return this.http.get<Produto[]>(`${this.apiUrl}/todos`);
}
buscarProdutosComFiltro(
  nome: string = '',
  categoria: string = '',
  page: number = 0,
  size: number = 10
): Observable<any> {
  const params = {
    nome,
    categoria,
    page: page.toString(),
    size: size.toString()
  };

  return this.http.get<any>('http://localhost:8081/produtos/buscar', { params });
}

}

