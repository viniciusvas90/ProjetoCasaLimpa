/*
 * Todos os direitos reservados
 */
package com.vas.casalimpa.java.controllers;

import com.vas.casalimpa.java.data.model.Cliente;
import com.vas.casalimpa.java.data.model.PerfilEnum;
import com.vas.casalimpa.java.data.model.Usuario;
import com.vas.casalimpa.java.data.repository.IClienteRepository;
import com.vas.casalimpa.java.data.repository.IUsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Vinicius
 */
@RestController
@RequestMapping(value = "clientes")
public class ClienteController {

    private final IUsuarioRepository usuarioRepository;
    private final IClienteRepository clienteRepository;

    public ClienteController(IUsuarioRepository usuarioRepository, IClienteRepository clienteRepository) {
        this.usuarioRepository = usuarioRepository;
        this.clienteRepository = clienteRepository;
    }

    @PostMapping
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<Cliente> createCliente(@RequestBody Cliente cliente) {
        Usuario usuario = usuarioRepository.findOne(cliente.getUsuario().getId());
        usuario.setPerfil(PerfilEnum.Cliente.valorPerfil);
        usuarioRepository.save(usuario);
        
        cliente.setNome(usuario.getNome());
        cliente.setUsuario(usuario);
        cliente = clienteRepository.save(cliente);
        return new ResponseEntity<>(cliente, HttpStatus.CREATED);
    }
}
