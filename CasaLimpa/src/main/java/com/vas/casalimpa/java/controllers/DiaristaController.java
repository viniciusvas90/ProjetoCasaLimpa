/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.vas.casalimpa.java.controllers;

import com.vas.casalimpa.java.data.model.Diarista;
import com.vas.casalimpa.java.data.model.DiaristaRecomendacao;
import com.vas.casalimpa.java.data.repository.IDiaristaRecomendacaoRepository;
import com.vas.casalimpa.java.data.repository.IDiaristaRepository;
import com.vas.casalimpa.java.data.repository.IEnderecoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Vinicius
 */
@RestController(value = "/diaristas")
public class DiaristaController {

    private final IDiaristaRepository diaristaRepository;
    private final IDiaristaRecomendacaoRepository diaristaRecomendacaoRepository;
    private final IEnderecoRepository enderecoRepository;

    @Autowired
    public DiaristaController(IDiaristaRepository diaristaRepository, IEnderecoRepository enderecoRepository, IDiaristaRecomendacaoRepository diaristaRecomendacaoRepository) {
        this.diaristaRepository = diaristaRepository;
        this.diaristaRecomendacaoRepository = diaristaRecomendacaoRepository;
        this.enderecoRepository = enderecoRepository;
    }

    @RequestMapping(value = "/diaristas", method = RequestMethod.POST)
    @Transactional(noRollbackFor = Exception.class)
    public ResponseEntity<Diarista> createDiarista(@RequestBody Diarista diarista) {
        enderecoRepository.save(diarista.getEndereco());
        Diarista novo = diaristaRepository.save(diarista);
        for (DiaristaRecomendacao recomendacao : diarista.getRecomendacoes()) {
            recomendacao.setDiarista(novo);
        }
        diaristaRecomendacaoRepository.save(diarista.getRecomendacoes());
        return new ResponseEntity<Diarista>(novo, HttpStatus.CREATED);
    }
    
    @RequestMapping(value = "/diaristas/pendentes", method = RequestMethod.GET)
    public Object listAllPendantDiaristas() {
        return diaristaRepository.findByAutorizadoOrderByDataCadastro(null);
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
    public String handleUserAlreadyExistsException(DataIntegrityViolationException e) {
        return e.getRootCause().getMessage();
    }
}
