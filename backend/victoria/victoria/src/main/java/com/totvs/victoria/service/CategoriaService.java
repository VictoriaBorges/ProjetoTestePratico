package com.totvs.victoria.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.totvs.victoria.exception.EntidadeNaoEncontradaException;
import com.totvs.victoria.model.Categoria;
import com.totvs.victoria.repository.CategoriaRepository;

@Service
public class CategoriaService {
	
	  @Autowired
	    private CategoriaRepository categoriaRepository;

	    public Categoria cadastrar(Categoria categoria) {
	        if (categoriaRepository.existsByNome(categoria.getNome())) {
	            throw new IllegalArgumentException("Já existe uma categoria com este nome.");
	        }
	        return categoriaRepository.save(categoria);
	    }

	    public List<Categoria> listarTodas() {
	        return categoriaRepository.findAll();
	    }

	    public Categoria atualizar(Long id, Categoria categoriaAtualizada) {
	        Categoria categoriaExistente = buscarPorId(id);

	        categoriaExistente.setNome(categoriaAtualizada.getNome());

	        return categoriaRepository.save(categoriaExistente);
	    }

	    public void excluir(Long id) {
	        Categoria categoria = buscarPorId(id);
	        categoriaRepository.delete(categoria);
	    }

	    public Categoria buscarPorId(Long id) {
	        return categoriaRepository.findById(id)
	                .orElseThrow(() -> new EntidadeNaoEncontradaException("Categoria não encontrada com ID: " + id));
	    }

	  
	    
	
	    public List<Map<String, Object>> calcularEstoqueTotalPorCategoria() {
	        List<Categoria> categorias = categoriaRepository.findAll();

	        return categorias.stream().map(categoria -> {
	            int totalEstoque = categoria.getProdutos()
	                    .stream()
	                    .mapToInt(produto -> Optional.ofNullable(produto.getQuantidadeEstoque()).orElse(0))
	                    .sum();

	            Map<String, Object> map = new HashMap<>();
	            map.put("categoria", categoria.getNome());
	            map.put("quantidadeTotalEstoque", totalEstoque);
	            return map;
	        }).collect(Collectors.toList());
	    }
	
}
