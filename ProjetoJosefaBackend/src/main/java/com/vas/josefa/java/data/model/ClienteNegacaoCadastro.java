/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.vas.josefa.java.data.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vas.josefa.java.data.model.abstracts.NegacaoCadastro;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

/**
 *
 * @author Vinicius
 */
@Entity
public class ClienteNegacaoCadastro extends NegacaoCadastro {
    
    @ManyToOne(optional = false, fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JsonIgnore
    private Cliente cliente;

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
}
