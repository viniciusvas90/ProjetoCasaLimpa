/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.vas.casalimpa.java.data.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

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
    private String descricao;
    @Column(nullable = false)
    private String tipo;
    @Column(nullable = false)
    private int qtdComodos;
    private float metrosQuadrados;
    @Column(nullable = false)
    private boolean temAnimais;
    private String animais;
    private boolean temCriancas;
    private int qtdCriancas;

    @OneToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(nullable = false)
    private Endereco endereco;
    
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private Cliente cliente;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public int getQtdComodos() {
        return qtdComodos;
    }

    public void setQtdComodos(int qtdComodos) {
        this.qtdComodos = qtdComodos;
    }

    public float getMetrosQuadrados() {
        return metrosQuadrados;
    }

    public void setMetrosQuadrados(float metrosQuadrados) {
        this.metrosQuadrados = metrosQuadrados;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public boolean getTemAnimais() {
        return temAnimais;
    }

    public void setTemAnimais(boolean temAnimais) {
        this.temAnimais = temAnimais;
    }

    public String getAnimais() {
        return animais;
    }

    public void setAnimais(String animais) {
        this.animais = animais;
    }
    
    public boolean getTemCriancas() {
        return temCriancas;
    }

    public int getQtdCriancas() {
        return qtdCriancas;
    }

    public void setTemCriancas(boolean temCriancas) {
        this.temCriancas = temCriancas;
    }

    public void setQtdCriancas(int qtdCriancas) {
        this.qtdCriancas = qtdCriancas;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
