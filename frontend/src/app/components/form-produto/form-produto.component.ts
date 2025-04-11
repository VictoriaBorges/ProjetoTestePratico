import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto';

@Component({
  selector: 'app-form-produto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-produto.component.html',
  styleUrls: ['./form-produto.component.scss']
})
export class FormProdutoComponent implements OnInit {
  form!: FormGroup;
  modoEdicao: boolean = false;
  idProduto!: number;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      descricao: [''],
      preco: [0, [Validators.required, Validators.min(0)]],
      quantidadeEstoque: [0, [Validators.required, Validators.min(0)]],
      categoria: this.fb.group({
        id: [null, Validators.required]
      })
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.modoEdicao = true;
      this.idProduto = +id;
      this.produtoService.getProdutoById(this.idProduto).subscribe({
        next: (produto) => {
          this.form.patchValue(produto);
        },
        error: (err) => {
          console.error(' Erro ao carregar produto:', err);
          alert('Produto não encontrado.');
          this.router.navigate(['/']);
        }
      });
    }
  }

  salvar(): void {
    if (this.form.invalid) {
      alert('⚠️ Preencha todos os campos obrigatórios corretamente!');
      return;
    }

    const produto: Produto = this.form.value;

    if (this.modoEdicao) {
      this.produtoService.atualizarProduto(this.idProduto, produto).subscribe(() => {
        alert(' Produto atualizado com sucesso!');
        this.router.navigate(['/']);
      });
    } else {
      this.produtoService.criarProduto(produto).subscribe(() => {
        alert(' Produto criado com sucesso!');
        this.router.navigate(['/']);
      });
    }
  }

  voltar(): void {
    this.router.navigate(['/']);
  }
}
