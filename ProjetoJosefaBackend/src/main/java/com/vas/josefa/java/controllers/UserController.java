/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.vas.josefa.java.controllers;

import com.vas.josefa.java.data.model.Usuario;
import com.vas.josefa.java.data.repository.IUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Vinícius
 */
@RestController
public class UserController {

    private final IUsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserController(IUsuarioRepository usuarioRepository,
                          BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }
    
    @PostMapping(value = "/register")
    public void register(@RequestBody Usuario user) {
        user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
        this.usuarioRepository.save(user);
    }
    
    @GetMapping(value = "/logado/{email:.+}")
    public ResponseEntity<Usuario> usuarioLogado(@PathVariable String email) {
        return new ResponseEntity<>(this.usuarioRepository.findUsuarioByEmail(email), HttpStatus.OK);
    }
    
}
