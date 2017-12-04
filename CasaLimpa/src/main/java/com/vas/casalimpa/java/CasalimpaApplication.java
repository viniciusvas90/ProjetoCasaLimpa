package com.vas.casalimpa.java;

import com.vas.casalimpa.java.data.repository.IDiaristaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class CasalimpaApplication implements CommandLineRunner {
        
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public static void main(String[] args) {
        SpringApplication.run(CasalimpaApplication.class, args);
    }

    @Override
    public void run(String... strings) throws Exception {
        
    }
}
