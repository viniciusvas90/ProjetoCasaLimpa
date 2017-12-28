package com.vas.casalimpa.java.data.repository;

import com.vas.casalimpa.java.data.model.Cliente;
import com.vas.casalimpa.java.data.model.Diarista;
import java.util.List;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 *
 * @author Vinicius
 */
@RepositoryRestResource(collectionResourceRel = "cliente", path = "cliente")
public interface IClienteRepository extends PagingAndSortingRepository<Cliente, Integer> {

    List<Cliente> findByAutorizadoOrderByDataCadastro(Boolean autorizado);

}
