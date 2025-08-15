package com.example.cardapio.food;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
@Component
public class DatabaseConnectionTeste {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void testConnection() {
        try {
            Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            System.out.println("✅ Conexão com o banco de dados funcionando! Resultado: " + result);
        } catch (Exception e) {
            System.out.println("❌ Falha na conexão com o banco de dados:");
            e.printStackTrace();
        }
    }
}
