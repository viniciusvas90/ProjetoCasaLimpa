package com.vas.josefa.java.data.repository;

import com.vas.josefa.java.data.model.Cliente;
import com.vas.josefa.java.data.model.Diarista;
import java.util.List;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 *
 * @author Vinicius
 */
@RepositoryRestResource(collectionResourceRel = "cliente", path = "cliente")
public interface IClienteRepository extends PagingAndSortingRepository<Cliente, Integer>, IClienteRepositoryCustom {

    List<Cliente> findByAutorizadoOrderByDataCadastro(Boolean autorizado);

}
