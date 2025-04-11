import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto';
import { EstoqueCategoriaComponent } from '../../categorias/estoque-categoria/estoque-categoria.component';

@Component({
  selector: 'app-lista-produto',
  standalone: true,
  imports: [CommonModule, RouterModule,EstoqueCategoriaComponent],
  templateUrl: './lista-produto.component.html',
  styleUrls: ['./lista-produto.component.scss']
})
export class ListaProdutoComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService.getProdutos().subscribe(produtos => {
      this.produtos = produtos;
    });
  }

  editarProduto(id?: number): void {
    if (id !== undefined) {
      this.router.navigate(['/editar', id]);
    }
  }

  deletarProduto(id?: number): void {
    if (id !== undefined && confirm('Tem certeza que deseja excluir este produto?')) {
      this.produtoService.deletarProduto(id).subscribe({
        next: () => {
          alert('Produto excluído!');
          this.carregarProdutos();
        },
        error: () => {
          alert(' Erro ao excluir produto,Não é permitido excluir produtos com estoque maior que zero');
        }
      });
    }
  }
}

