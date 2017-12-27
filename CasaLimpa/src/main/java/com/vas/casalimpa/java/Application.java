package com.vas.casalimpa.java;

import com.vas.casalimpa.java.data.model.Usuario;
import com.vas.casalimpa.java.data.repository.IUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class Application implements CommandLineRunner {

    private final IUsuarioRepository usuarioRepository;

    @Autowired
    public Application(IUsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);

    }

    @Override
    public void run(String... strings) throws Exception {
        this.insereAdmins();
    }

    public void insereAdmins() {
        if (usuarioRepository.count() == 0) {
            Usuario usuario = new Usuario();
            usuario.setEmail("vinicius.vas.ti@gmail.com");
            usuario.setNome("Vinícius");
            usuario.setPassword("1234");
            usuario.setPerfil(0);
            usuarioRepository.save(usuario);
        }
    }
}
