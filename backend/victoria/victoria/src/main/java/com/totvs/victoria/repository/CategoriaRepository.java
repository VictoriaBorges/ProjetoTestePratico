package com.totvs.victoria.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.totvs.victoria.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    boolean existsByNome(String nome);


}
