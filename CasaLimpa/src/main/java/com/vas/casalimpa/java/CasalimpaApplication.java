package com.vas.casalimpa.java;

import com.vas.casalimpa.java.data.repository.IDiaristaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CasalimpaApplication implements CommandLineRunner {
    
    @Autowired
    IDiaristaRepository diaristaRepository;

    public static void main(String[] args) {
        SpringApplication.run(CasalimpaApplication.class, args);
    }

    @Override
    public void run(String... strings) throws Exception {
        //diaristaRepository.count();
    }
}
