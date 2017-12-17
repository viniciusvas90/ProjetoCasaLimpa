/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.vas.casalimpa.java.controllers;

import com.vas.casalimpa.java.VasUtils;
import com.vas.casalimpa.java.data.model.Diarista;
import com.vas.casalimpa.java.data.model.DiaristaRecomendacao;
import com.vas.casalimpa.java.data.model.Usuario;
import com.vas.casalimpa.java.data.repository.IDiaristaRecomendacaoRepository;
import com.vas.casalimpa.java.data.repository.IDiaristaRepository;
import com.vas.casalimpa.java.data.repository.IEnderecoRepository;
import com.vas.casalimpa.java.data.repository.IUsuarioRepository;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.imageio.ImageIO;
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
    private final IUsuarioRepository usuarioRepository;
    private final String caminho = "fotos"+File.separator+"diaristas"+File.separator;

    @Autowired
    public DiaristaController(
            IDiaristaRepository diaristaRepository,
            IEnderecoRepository enderecoRepository,
            IDiaristaRecomendacaoRepository diaristaRecomendacaoRepository,
            IUsuarioRepository usuarioRepository
    ) {
        this.diaristaRepository = diaristaRepository;
        this.diaristaRecomendacaoRepository = diaristaRecomendacaoRepository;
        this.enderecoRepository = enderecoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @RequestMapping(value = "/diaristas", method = RequestMethod.POST)
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<Diarista> createDiarista(@RequestBody Diarista diarista) throws Exception {
        Usuario usuario = usuarioRepository.findOne(diarista.getUsuario().getId());
        diarista.setNome(usuario.getNome());
        diarista.setUsuario(usuario);
        enderecoRepository.save(diarista.getEndereco());
        Diarista novo = diaristaRepository.save(diarista);
        for (DiaristaRecomendacao recomendacao : diarista.getRecomendacoes()) {
            recomendacao.setDiarista(novo);
        }
        diaristaRecomendacaoRepository.save(diarista.getRecomendacoes());
        this.salvarFoto(diarista.getFotoBase64Image(), "foto_" + novo.getId() + "_" + novo.getNome());
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

    private void salvarFoto(String fotoBase64Image, String nomeArquivo) throws Exception {
        fotoBase64Image = fotoBase64Image.replace("data:image/jpeg;base64,", "");
        try {
            BufferedImage bufferedImage = VasUtils.decodeToImage(fotoBase64Image);
            File outputfile = new File(caminho + nomeArquivo + ".jpg");
            outputfile.mkdirs();
            ImageIO.write(bufferedImage, "jpg", outputfile);
        } catch (Exception ex) {
            throw new Exception("Erro ao salvar imagem");
        }
    }
}
