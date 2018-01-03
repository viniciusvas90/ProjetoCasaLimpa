package com.vas.casalimpa.java.data.repository;

import com.vas.casalimpa.java.data.model.Cliente;

/**
 *
 * @author Vinicius
 */
public interface IClienteRepositoryCustom {
    
    Cliente findByUsuario(int idUsuario);

}
