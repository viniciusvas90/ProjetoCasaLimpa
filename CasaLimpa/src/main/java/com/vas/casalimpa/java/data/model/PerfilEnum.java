/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.vas.casalimpa.java.data.model;

/**
 *
 * @author Vinicius
 */
public enum PerfilEnum {
    Administrador(0), Cliente(1), Diarista(2);
    public int valorPerfil;
    PerfilEnum(int valor) {
        valorPerfil = valor;
    }
}
