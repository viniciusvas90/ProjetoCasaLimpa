/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.vas.casalimpa.java.data.model;

import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

/**
 *
 * @author Vinícius
 */
@Entity
public class Cliente {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(nullable = false)
    private String nome;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL)
    private Set<Imovel> imoveis;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL)
    private Set<FormaPagamento> formasPagamentos;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<Imovel> getImoveis() {
        return imoveis;
    }

    public void setImoveis(Set<Imovel> imoveis) {
        this.imoveis = imoveis;
    }

    public Set<FormaPagamento> getFormasPagamentos() {
        return formasPagamentos;
    }

    public void setFormasPagamentos(Set<FormaPagamento> formasPagamentos) {
        this.formasPagamentos = formasPagamentos;
    }
}
