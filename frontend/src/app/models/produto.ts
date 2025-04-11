export interface Categoria {
    id: number;
    nome: string;
  }
  
  export interface Produto {
    id?: number;
    nome: string;
    descricao?: string;
    preco: number;
    quantidadeEstoque: number;
    categoria: Categoria;
  }
  