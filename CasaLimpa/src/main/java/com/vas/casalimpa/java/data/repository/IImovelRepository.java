package com.vas.casalimpa.java.data.repository;

import com.vas.casalimpa.java.data.model.Imovel;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 *
 * @author Vinicius
 */
@RepositoryRestResource(collectionResourceRel = "imovel", path = "imovel")
public interface IImovelRepository extends PagingAndSortingRepository<Imovel, Integer> {

}
