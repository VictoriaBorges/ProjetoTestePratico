package com.totvs.victoria.service;

import com.totvs.victoria.exception.EntidadeNaoEncontradaException;
import com.totvs.victoria.exception.RegraNegocioException;
import com.totvs.victoria.model.Produto;
import com.totvs.victoria.repository.ProdutoRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;


@Service
public class ProdutoService {

	@Autowired
    private ProdutoRepository produtoRepository;

   

    // Cadastrar produto com regras de negócio]
    
    @Transactional
    public Produto cadastrar(Produto produto) {
        validarProdutoUnico(produto);
        return produtoRepository.save(produto);
    }

    // Atualizar produto
    @Transactional
    public Produto atualizar(Long id, Produto produtoAtualizado) {
        Produto produtoExistente = buscarPorId(id);

        if (!produtoExistente.getNome().equals(produtoAtualizado.getNome()) ||
            !produtoExistente.getCategoria().getId().equals(produtoAtualizado.getCategoria().getId())) {
            validarProdutoUnico(produtoAtualizado);
        }

        produtoExistente.setNome(produtoAtualizado.getNome());
        produtoExistente.setDescricao(produtoAtualizado.getDescricao());
        produtoExistente.setPreco(produtoAtualizado.getPreco());
        produtoExistente.setQuantidadeEstoque(produtoAtualizado.getQuantidadeEstoque());
        produtoExistente.setCategoria(produtoAtualizado.getCategoria());

        return produtoRepository.save(produtoExistente);
    }

    public Page<Produto> listarTodos(Pageable pageable) {
        return produtoRepository.findAll(pageable);

    }

    

    // Buscar por ID
    public Produto buscarPorId(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Produto não encontrado com ID: " + id));
    }

    // Excluir produto com verificação de estoque
    @Transactional
    public void excluir(Long id) {
        Produto produto = buscarPorId(id);
        if (produto.getQuantidadeEstoque() > 0) {
            throw new RegraNegocioException("Não é permitido excluir produtos com estoque maior que zero.");
        }
        produtoRepository.delete(produto);
    }

    // Buscar com filtros parciais (nome + categoria)
    public Page<Produto> buscarPorNomeECategoria(String nome, String categoria, Pageable pageable) {
        return produtoRepository.findByNomeContainingIgnoreCaseAndCategoria_NomeContainingIgnoreCase(
                nome, categoria, pageable);
    }

    // Validação de nome único por categoria
    private void validarProdutoUnico(Produto produto) {
        boolean existe = produtoRepository.existsByNomeAndCategoria_Nome(
                produto.getNome(), produto.getCategoria().getNome());

        if (existe) {
            throw new RegraNegocioException("Produto com este nome já existe nesta categoria.");
        }
    }

}
