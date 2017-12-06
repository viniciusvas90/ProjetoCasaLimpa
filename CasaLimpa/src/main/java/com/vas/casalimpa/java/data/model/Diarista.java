/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.vas.casalimpa.java.data.model;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;

/**
 *
 * @author Vinicius
 */
@Entity
public class Diarista {

    @Id
    @GeneratedValue()
    private int id;
    @Column(nullable = false)
    private String nome;
    @Column(nullable = false, unique = true)
    private String cpf;
    @Column(nullable = false, unique = true)
    private String rg;
    @Column(nullable = false)
    private String telefone;
    private String sindicato;
    private Boolean autorizado;
    @Column(updatable = false, nullable = false)
    private Date dataCadastro;
    @Column(insertable = false)
    private Date dataAutorizado;

    @OneToMany(mappedBy = "diarista")
    private Set<DiaristaRecomendacao> recomendacoes;

    @OneToMany(mappedBy = "diarista", cascade = CascadeType.ALL)
    private Set<Avaliacao> avaliacoes;

    @OneToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(nullable = false)
    private Endereco endereco;

    @OneToOne(optional = true)
    @JoinColumn(unique = true)
    private Usuario usuario;

    @PrePersist
    void onInsert() {
        this.dataCadastro = new Date();
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public void setAutorizado(Boolean autorizado) {
        this.autorizado = autorizado;
    }

    public Boolean getAutorizado() {
        return autorizado;
    }

    public String getSindicato() {
        return sindicato;
    }

    public void setSindicato(String sindicato) {
        this.sindicato = sindicato;
    }

    public Set<DiaristaRecomendacao> getRecomendacoes() {
        return recomendacoes;
    }

    public void setRecomendacoes(Set<DiaristaRecomendacao> recomendacoes) {
        this.recomendacoes = recomendacoes;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }
    
    public String getDataCadastro() {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        return sdf.format(dataCadastro);
    }

    public String getDataAutorizado() {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        return dataAutorizado != null ? sdf.format(dataAutorizado) : null;
    }
        
    public void setDataAutorizado(Date dataAutorizado) {
        this.dataAutorizado = dataAutorizado;
    }

    public Set<Avaliacao> getAvaliacoes() {
        return avaliacoes;
    }

    public void setAvaliacoes(Set<Avaliacao> avaliacoes) {
        this.avaliacoes = avaliacoes;
    }

}
