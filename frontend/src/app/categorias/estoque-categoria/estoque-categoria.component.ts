import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-estoque-categoria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estoque-categoria.component.html',
  styleUrls: ['./estoque-categoria.component.scss']
})
export class EstoqueCategoriaComponent implements OnInit {
  categorias: any[] = [];
  categoriaSelecionada: string = '';
  estoquePorCategoria: number = 0;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.categoriaService.getEstoquePorCategoria().subscribe({
      next: (dados) => {
        this.categorias = dados;
      },
      error: (erro) => {
        console.error(' Erro ao carregar estoque por categoria:', erro);
      }
    });
  }

  filtrarPorCategoria(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.categoriaSelecionada = selectElement.value;

    const categoriaEncontrada = this.categorias.find(
      (cat) => cat.categoria === this.categoriaSelecionada
    );

    this.estoquePorCategoria = categoriaEncontrada
      ? categoriaEncontrada.quantidadeTotalEstoque
      : 0;
  }
}
