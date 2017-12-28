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
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Temporal;
import javax.persistence.Transient;

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
    @Column(nullable = false, unique = true)
    private String cpf;
    private String telefone;
    private Boolean autorizado;
    @Column(updatable = false, nullable = false)
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date dataCadastro;
    @Column(insertable = false)
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date dataAutorizado;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL)
    private Set<Imovel> imoveis;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL)
    private Set<FormaPagamento> formasPagamentos;

    @OneToOne(optional = true)
    @JoinColumn(unique = true)
    private Usuario usuario;

    @Transient
    private String fotoBase64Image;

    @PrePersist
    void onInsert() {
        this.dataCadastro = new Date();
    }
    
    @PreUpdate
    void onUpdate() {
        if (this.autorizado) {
            this.dataAutorizado = new Date();
        }
    }

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

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
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

    public String getFotoBase64Image() {
        return fotoBase64Image;
    }

    public void setFotoBase64Image(String fotoBase64Image) {
        this.fotoBase64Image = fotoBase64Image;
    }

    public Boolean getAutorizado() {
        return autorizado;
    }

    public void setAutorizado(Boolean autorizado) {
        this.autorizado = autorizado;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
}
