/*
 * Todos os direitos reservados
 */
package com.vas.casalimpa.java.controllers;

import com.vas.casalimpa.java.VasUtils;
import com.vas.casalimpa.java.data.model.Cliente;
import com.vas.casalimpa.java.data.model.PerfilEnum;
import com.vas.casalimpa.java.data.model.Usuario;
import com.vas.casalimpa.java.data.repository.IClienteRepository;
import com.vas.casalimpa.java.data.repository.IUsuarioRepository;
import java.awt.image.BufferedImage;
import java.io.File;
import javax.imageio.ImageIO;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
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
    private final String caminho = "fotos"+File.separator+"clientes"+File.separator;

    public ClienteController(IUsuarioRepository usuarioRepository, IClienteRepository clienteRepository) {
        this.usuarioRepository = usuarioRepository;
        this.clienteRepository = clienteRepository;
    }

    @PostMapping
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<Cliente> createCliente(@RequestBody Cliente cliente) throws Exception {
        Usuario usuario = usuarioRepository.findOne(cliente.getUsuario().getId());
        usuario.setPerfil(PerfilEnum.Cliente.valorPerfil);
        usuarioRepository.save(usuario);
        
        cliente.setNome(usuario.getNome());
        cliente.setUsuario(usuario);
        cliente = clienteRepository.save(cliente);
        this.salvarFoto(cliente.getFotoBase64Image(), "foto_" + cliente.getId() + "_" + cliente.getNome());
        return new ResponseEntity<>(cliente, HttpStatus.CREATED);
    }

    @GetMapping(value = "/pendentes")
    public Object listAllPendantCliente() {
        return clienteRepository.findByAutorizadoOrderByDataCadastro(null);
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
