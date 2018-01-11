/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.vas.josefa.java.data.repository;

import com.vas.josefa.java.data.model.DiaristaRecomendacao;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 *
 * @author Vinicius
 */
@RepositoryRestResource(collectionResourceRel = "diarista_recomendacao", path = "diarista_recomendacao")
public interface IDiaristaRecomendacaoRepository extends PagingAndSortingRepository<DiaristaRecomendacao, Integer> {
    
}
