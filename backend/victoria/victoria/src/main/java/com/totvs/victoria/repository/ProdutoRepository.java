package com.totvs.victoria.repository;

import com.totvs.victoria.model.Produto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    boolean existsByNomeAndCategoria_Nome(String nome, String categoria);

    Page<Produto> findByNomeContainingIgnoreCaseAndCategoria_NomeContainingIgnoreCase(String nome, String categoria, Pageable pageable);

    @Query("SELECT p FROM Produto p JOIN FETCH p.categoria")
    List<Produto> findAllComCategoria();
}
