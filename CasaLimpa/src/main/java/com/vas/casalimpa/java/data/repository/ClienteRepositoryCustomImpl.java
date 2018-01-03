package com.vas.casalimpa.java.data.repository;

import com.vas.casalimpa.java.data.model.Cliente;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 *
 * @author Vinicius
 */
public class ClienteRepositoryCustomImpl implements IClienteRepositoryCustom {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public Cliente findByUsuario(int idUsuario) {
        Query query = entityManager.createNativeQuery("select * from cliente where id_usuario = ? ");
        query.setParameter(1, idUsuario);
        return (Cliente) query.getSingleResult();
    }

}
