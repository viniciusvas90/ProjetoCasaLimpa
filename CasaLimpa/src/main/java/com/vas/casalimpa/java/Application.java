package com.vas.casalimpa.java;

import com.vas.casalimpa.java.data.model.Cliente;
import com.vas.casalimpa.java.data.model.Diarista;
import com.vas.casalimpa.java.data.model.DiaristaRecomendacao;
import com.vas.casalimpa.java.data.model.Endereco;
import com.vas.casalimpa.java.data.model.Usuario;
import com.vas.casalimpa.java.data.repository.IClienteRepository;
import com.vas.casalimpa.java.data.repository.IDiaristaRecomendacaoRepository;
import com.vas.casalimpa.java.data.repository.IDiaristaRepository;
import com.vas.casalimpa.java.data.repository.IEnderecoRepository;
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
    private final IClienteRepository clienteRepository;
    private final IDiaristaRepository diaristaRepository;

    @Autowired
    public Application(IUsuarioRepository usuarioRepository,
            IClienteRepository clienteRepository,
            IDiaristaRepository diaristaRepository,
            IEnderecoRepository enderecoRepository,
            IDiaristaRecomendacaoRepository diaristaRecomendacaoRepository) {
        this.usuarioRepository = usuarioRepository;
        this.clienteRepository = clienteRepository;
        this.diaristaRepository = diaristaRepository;
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
            usuario.setPassword("$2a$10$N41XJfzoxsnxNWuNSTxfIuqahlLKS2D7m2lFpuQSzRawKMQJheIRK");
            usuario.setPerfil(0);
            usuarioRepository.save(usuario);
        }
        
        if (diaristaRepository.count() == 0) {            
            //diarista
            Diarista diarista1 = new Diarista();
            diarista1.setNome("JOSEFA SANTOS DE JESUS");
            diarista1.setCpf("123456789");
            diarista1.setRg("987654321");
            diarista1.setTelefone("98999999");
            diarista1.setSindicato("165151");
            //recomendacoes
            DiaristaRecomendacao diarista1Recomendacao1 = new DiaristaRecomendacao();
            diarista1Recomendacao1.setNome("DONA MARIA");
            diarista1Recomendacao1.setTelefone("32145678");
            diarista1Recomendacao1.setDiarista(diarista1);
            diarista1.getRecomendacoes().add(diarista1Recomendacao1);
            
            DiaristaRecomendacao diarista1Recomendacao2 = new DiaristaRecomendacao();
            diarista1Recomendacao2.setNome("DOUTORA CARLA");
            diarista1Recomendacao2.setTelefone("88996655");
            diarista1Recomendacao2.setDiarista(diarista1);
            diarista1.getRecomendacoes().add(diarista1Recomendacao2);
            
            DiaristaRecomendacao diarista1Recomendacao3 = new DiaristaRecomendacao();
            diarista1Recomendacao3.setNome("SEU CARLOS");
            diarista1Recomendacao3.setTelefone("98888456");
            diarista1Recomendacao3.setDiarista(diarista1);
            diarista1.getRecomendacoes().add(diarista1Recomendacao3);
            
            //endereco
            Endereco diarista1Endereco = new Endereco();
            diarista1Endereco.setCep(49000000);
            diarista1Endereco.setEndereco("RUA A");
            diarista1Endereco.setNumero(123);
            diarista1Endereco.setBairro("CENTRO");
            diarista1.setEndereco(diarista1Endereco);
            
            //usuario
            Usuario diarista1usuario = new Usuario();
            diarista1usuario.setEmail("josefa@gmail.com");
            diarista1usuario.setNome("JOSEFA SANTOS DE JESUS");
            diarista1usuario.setPassword("$2a$10$N41XJfzoxsnxNWuNSTxfIuqahlLKS2D7m2lFpuQSzRawKMQJheIRK");
            diarista1usuario.setPerfil(2);
            diarista1.setUsuario(usuarioRepository.save(diarista1usuario));
            
            diarista1 = diaristaRepository.save(diarista1);
                     
            //diarista
            Diarista diarista2 = new Diarista();
            diarista2.setNome("CLAUDINEIDE DOS SANTOS");
            diarista2.setCpf("3515619514");
            diarista2.setRg("9846151561");
            diarista2.setTelefone("88888552");
            diarista2.setSindicato("16515");
            //recomendacoes
            DiaristaRecomendacao diarista2Recomendacao1 = new DiaristaRecomendacao();
            diarista2Recomendacao1.setNome("MARIA DAS GRAÇAS");
            diarista2Recomendacao1.setTelefone("978978451");
            diarista2Recomendacao1.setDiarista(diarista2);
            diarista2.getRecomendacoes().add(diarista2Recomendacao1);
            
            DiaristaRecomendacao diarista2Recomendacao2 = new DiaristaRecomendacao();
            diarista2Recomendacao2.setNome("ANTONIETA");
            diarista2Recomendacao2.setTelefone("32254488");
            diarista2Recomendacao2.setDiarista(diarista2);
            diarista2.getRecomendacoes().add(diarista2Recomendacao2);
            
            DiaristaRecomendacao diarista2Recomendacao3 = new DiaristaRecomendacao();
            diarista2Recomendacao3.setNome("DOUTOR MARCIO");
            diarista2Recomendacao3.setTelefone("99884445");
            diarista2Recomendacao3.setDiarista(diarista2);
            diarista2.getRecomendacoes().add(diarista2Recomendacao3);
            
            //endereco
            Endereco diarista2Endereco = new Endereco();
            diarista2Endereco.setCep(49100000);
            diarista2Endereco.setEndereco("RUA SAO JOSE");
            diarista2Endereco.setNumero(987);
            diarista2Endereco.setBairro("BUGIO");
            diarista2.setEndereco(diarista2Endereco);
            
            //usuario
            Usuario diarista2usuario = new Usuario();
            diarista2usuario.setEmail("claudineide@gmail.com");
            diarista2usuario.setNome("CLAUDINEIDE DOS SANTOS");
            diarista2usuario.setPassword("$2a$10$40jWaGY32vBvgq6dYvR/2uf2zkpZq1m0XzPrJs/ozthBX5.Ll0w/O");
            diarista2usuario.setPerfil(2);
            diarista2.setUsuario(usuarioRepository.save(diarista2usuario));
            
            diarista2 = diaristaRepository.save(diarista2);
                     
            //diarista
            Diarista diarista3 = new Diarista();
            diarista3.setNome("SILVANEIDE");
            diarista3.setCpf("8948941561");
            diarista3.setRg("56181881");
            diarista3.setTelefone("98989889");
            
            //recomendacoes
            DiaristaRecomendacao diarista3Recomendacao1 = new DiaristaRecomendacao();
            diarista3Recomendacao1.setNome("DONA GRAÇA");
            diarista3Recomendacao1.setTelefone("7999966554");
            diarista3Recomendacao1.setDiarista(diarista3);
            diarista3.getRecomendacoes().add(diarista3Recomendacao1);
            
            DiaristaRecomendacao diarista3Recomendacao2 = new DiaristaRecomendacao();
            diarista3Recomendacao2.setNome("DRA JOSEFINA");
            diarista3Recomendacao2.setTelefone("798454544");
            diarista3Recomendacao2.setDiarista(diarista3);
            diarista3.getRecomendacoes().add(diarista3Recomendacao2);
            
            DiaristaRecomendacao diarista3Recomendacao3 = new DiaristaRecomendacao();
            diarista3Recomendacao3.setNome("DONA SILVANIA");
            diarista3Recomendacao3.setTelefone("7999966554");
            diarista3Recomendacao3.setDiarista(diarista3);
            diarista3.getRecomendacoes().add(diarista3Recomendacao3);
            
            //endereco
            Endereco diarista3Endereco = new Endereco();
            diarista3Endereco.setCep(49000654);
            diarista3Endereco.setEndereco("RUA DOS TRABALHADORES");
            diarista3Endereco.setNumero(321);
            diarista3Endereco.setBairro("SANTA MARIA");
            diarista3.setEndereco(diarista3Endereco);
            
            //usuario
            Usuario diarista3usuario = new Usuario();
            diarista3usuario.setEmail("silvaneide@gmail.com");
            diarista3usuario.setNome("SILVANEIDE");
            diarista3usuario.setPassword("$2a$10$tAZ9aayzHxJ3/D.SN//Xmu2QaGYc/Xn2tgTdGQA7ND5DytBGRo03i");
            diarista3usuario.setPerfil(2);
            diarista3.setUsuario(usuarioRepository.save(diarista3usuario));
            
            diarista3 = diaristaRepository.save(diarista3);
        }
        
        if (clienteRepository.count() == 0) {
            Cliente cliente = new Cliente();
            cliente.setNome("TÂNIA");
            cliente.setCpf("8498416515");
            cliente.setTelefone("9996663331");
            
            //usuario
            Usuario clienteUsuario = new Usuario();
            clienteUsuario.setEmail("tania@gmail.com");
            clienteUsuario.setNome("TÂNIA");
            clienteUsuario.setPassword("$2a$10$aEYRhK6XfYvF4MO7cjjs7.xZP.gcKnsgseCsfCxsCQKsjv9YKDcEm");
            clienteUsuario.setPerfil(1);
            cliente.setUsuario(usuarioRepository.save(clienteUsuario));
            clienteRepository.save(cliente);
        }
    }
}
