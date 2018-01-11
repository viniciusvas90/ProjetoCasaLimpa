package com.vas.josefa.java.data.repository;

import com.vas.josefa.java.data.model.Cliente;

/**
 *
 * @author Vinicius
 */
public interface IClienteRepositoryCustom {
    
    Cliente findByUsuario(int idUsuario);

}
