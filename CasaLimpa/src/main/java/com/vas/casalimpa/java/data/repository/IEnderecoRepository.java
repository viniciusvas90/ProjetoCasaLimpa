/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.vas.casalimpa.java.data.repository;

import com.vas.casalimpa.java.data.model.Endereco;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 *
 * @author Vinicius
 */
@RepositoryRestResource(collectionResourceRel = "endereco", path = "endereco")
public interface IEnderecoRepository extends PagingAndSortingRepository<Endereco, Integer> {
    
}
