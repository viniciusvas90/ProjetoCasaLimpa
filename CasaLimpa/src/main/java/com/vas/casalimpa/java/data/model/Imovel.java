/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.vas.casalimpa.java.data.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

/**
 *
 * @author Vinícius
 */
@Entity
public class Imovel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(nullable = false)
    private String endereco;
    @Column(nullable = false)
    private String tipo;
    @Column(nullable = false)
    private int qtd_comodos;
    private float metros_quadrados;
    
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private Cliente cliente;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public int getQtd_comodos() {
        return qtd_comodos;
    }

    public void setQtd_comodos(int qtd_comodos) {
        this.qtd_comodos = qtd_comodos;
    }

    public float getMetros_quadrados() {
        return metros_quadrados;
    }

    public void setMetros_quadrados(float metros_quadrados) {
        this.metros_quadrados = metros_quadrados;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
}
