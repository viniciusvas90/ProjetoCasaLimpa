/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.vas.casalimpa.data.repository;

import com.vas.casalimpa.data.model.Diarista;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 *
 * @author Vinicius
 */
@RepositoryRestResource(collectionResourceRel = "diarista", path = "diarista")
public interface IDiaristaRepository extends PagingAndSortingRepository<Diarista, Integer> {
    
}
