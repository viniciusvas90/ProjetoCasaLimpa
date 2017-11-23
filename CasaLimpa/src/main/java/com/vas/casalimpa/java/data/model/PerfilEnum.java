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
    Diarista(1), Cliente(2), Administrador(0);
    public int valorPerfil;
    PerfilEnum(int valor) {
        valorPerfil = valor;
    }
}
