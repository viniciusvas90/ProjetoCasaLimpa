/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.vas.casalimpa.java.controllers;

import com.vas.casalimpa.java.VasUtils;
import com.vas.casalimpa.java.data.model.Diarista;
import com.vas.casalimpa.java.data.model.DiaristaRecomendacao;
import com.vas.casalimpa.java.data.model.PerfilEnum;
import com.vas.casalimpa.java.data.model.Usuario;
import com.vas.casalimpa.java.data.repository.IDiaristaRecomendacaoRepository;
import com.vas.casalimpa.java.data.repository.IDiaristaRepository;
import com.vas.casalimpa.java.data.repository.IEnderecoRepository;
import com.vas.casalimpa.java.data.repository.IUsuarioRepository;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.List;
import javax.imageio.ImageIO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Vinicius
 */
@RestController(value = "/diaristas")
@RequestMapping(value = "/diaristas")
public class DiaristaController {

    private final IDiaristaRepository diaristaRepository;
    private final IUsuarioRepository usuarioRepository;
    private final String caminho = "fotos" + File.separator + "diaristas" + File.separator;

    @Autowired
    public DiaristaController(
            IDiaristaRepository diaristaRepository,
            IEnderecoRepository enderecoRepository,
            IDiaristaRecomendacaoRepository diaristaRecomendacaoRepository,
            IUsuarioRepository usuarioRepository
    ) {
        this.diaristaRepository = diaristaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<Diarista> createDiarista(@RequestBody Diarista diarista) throws Exception {
        //Recupera usuário e associa ao perfil de diarista
        Usuario usuario = usuarioRepository.findOne(diarista.getUsuario().getId());
        usuario.setPerfil(PerfilEnum.Diarista.valorPerfil);
        usuarioRepository.save(usuario);

        diarista.setNome(usuario.getNome());
        diarista.setUsuario(usuario);
        for (DiaristaRecomendacao recomendacao : diarista.getRecomendacoes()) {
            recomendacao.setDiarista(diarista);
        }
        diarista.getEndereco().setDiarista(diarista);
        diaristaRepository.save(diarista);
        this.salvarFoto(diarista.getFotoBase64Image(), "foto_" + diarista.getId() + "_" + diarista.getNome());
        return new ResponseEntity<>(diarista, HttpStatus.CREATED);
    }

    @PutMapping(value = "/authorize")
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<Diarista> authorizeCliente(@RequestBody Diarista diarista) throws Exception {
        diarista = diaristaRepository.findOne(diarista.getId());
        diarista.setAutorizado(Boolean.TRUE);
        //diaristaRepository.save(diarista);
        return new ResponseEntity<>(diarista, HttpStatus.OK);
    }

    @GetMapping(value = "/pendentes")
    public Object listAllPendantDiaristas() throws Exception {
        List<Diarista> diaristas = diaristaRepository.findByAutorizadoOrderByDataCadastro(null);
        for (Diarista diarista : diaristas) {
            diarista.setFotoBase64Image(recuperarFoto("foto_" + diarista.getId() + "_" + diarista.getNome()));
        }
        return diaristas;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
    public String handleUserAlreadyExistsException(DataIntegrityViolationException e) {
        return e.getRootCause().getMessage();
    }

    private void salvarFoto(String fotoBase64Image, String nomeArquivo) throws Exception {
        fotoBase64Image = fotoBase64Image.replace("data:image/jpeg;base64,", "");
        try {
            BufferedImage bufferedImage = VasUtils.base64ToImage(fotoBase64Image);
            File outputfile = new File(caminho + nomeArquivo + ".jpg");
            outputfile.mkdirs();
            ImageIO.write(bufferedImage, "jpg", outputfile);
        } catch (Exception ex) {
            throw new Exception("Erro ao salvar imagem");
        }
    }

    private String recuperarFoto(String nomeArquivo) throws Exception {
        return VasUtils.imageToBase64(new File(caminho + nomeArquivo + ".jpg"));
    }
}
