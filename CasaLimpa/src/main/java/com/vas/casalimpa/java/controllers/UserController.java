/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.vas.casalimpa.java.controllers;

import com.sun.org.apache.xml.internal.security.algorithms.SignatureAlgorithm;
import com.vas.casalimpa.java.data.model.Usuario;
import com.vas.casalimpa.java.data.repository.IUsuarioRepository;
import io.jsonwebtoken.Jwts;
import java.util.Date;
import javax.servlet.ServletException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.http.HttpRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Vinícius
 */
@RestController
public class UserController {

    private final IUsuarioRepository usuarioRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserController(IUsuarioRepository usuarioRepository,
                          BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @PostMapping(value = "/login")
    public Usuario login(@RequestBody Usuario login) throws ServletException {

        if (login.getEmail() == null && login.getUserName() == null) {
            throw new ServletException("Informe seu nome de usuário ou email.");
        }
        if (login.getSenha() == null) {
            throw new ServletException("Informe sua senha.");
        }

        String email = login.getEmail();
        String userName = login.getUserName();
        String password = login.getSenha();

        Usuario user = null;
        if (email != null && !email.isEmpty()) {
            user = usuarioRepository.FindUsuarioByEmail(email);
        } else if (userName != null && !userName.isEmpty()) {
            user = usuarioRepository.FindUsuarioByUserName(userName);
        }

        if (user == null) {
            throw new ServletException("Usuário não encontrado.");
        }

        if (this.bCryptPasswordEncoder.encode(password).equals(user.getSenha())) {
            throw new ServletException("Usuário ou senha inválidos.");
        }
        
        //user.setToken(JWTUtil.create(userName));

        return user;
    }
    
    @PostMapping(value = "/register")
    public void register(@RequestBody Usuario user) {
        user.setSenha(this.bCryptPasswordEncoder.encode(user.getSenha()));
        this.usuarioRepository.save(user);
    }
    
    @RequestMapping(value = "/logado", method = RequestMethod.GET)
    public String usuarioLogado() {
        return "{teste}";
    }
    
    /**
     * http://www.totalcross.com/blog/seguranca-com-jwt-e-java/
     * https://aboullaite.me/spring-boot-token-authentication-using-jwt/
     * 
     * https://auth0.com/blog/implementing-jwt-authentication-on-spring-boot/
     */
}
