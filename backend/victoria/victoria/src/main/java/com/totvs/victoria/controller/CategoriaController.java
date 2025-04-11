package com.totvs.victoria.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.totvs.victoria.model.Categoria;
import com.totvs.victoria.service.CategoriaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {
	
	 @Autowired
	    private CategoriaService categoriaService;

	    @PostMapping
	    public ResponseEntity<Categoria> cadastrar(@Valid @RequestBody Categoria categoria) {
	        return ResponseEntity.ok(categoriaService.cadastrar(categoria));
	    }

	    @GetMapping
	    public ResponseEntity<List<Categoria>> listar() {
	        return ResponseEntity.ok(categoriaService.listarTodas());
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<Categoria> atualizar(@PathVariable Long id, @Valid @RequestBody Categoria categoria) {
	        return ResponseEntity.ok(categoriaService.atualizar(id, categoria));
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> excluir(@PathVariable Long id) {
	        categoriaService.excluir(id);
	        return ResponseEntity.noContent().build();
	    }

	    @GetMapping("/estoque-total")
	    public ResponseEntity<List<Map<String, Object>>> estoqueTotalPorCategoria() {
	        return ResponseEntity.ok(categoriaService.calcularEstoqueTotalPorCategoria());
	    }
	}

