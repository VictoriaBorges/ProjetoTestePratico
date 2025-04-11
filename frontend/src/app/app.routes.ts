import { Routes } from '@angular/router';
import { ListaProdutoComponent } from './components/lista-produto/lista-produto.component';
import { FormProdutoComponent } from './components/form-produto/form-produto.component';

export const routes: Routes = [
  { path: '', component: ListaProdutoComponent },
  { path: 'cadastrar', component: FormProdutoComponent },
  {
    path: 'editar/:id',
    loadComponent: () =>
      import('./components/form-produto/form-produto.component').then(
        (m) => m.FormProdutoComponent
      ),
  },
];
