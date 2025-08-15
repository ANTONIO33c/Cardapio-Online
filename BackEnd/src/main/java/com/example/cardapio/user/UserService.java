package com.example.cardapio.user;

import com.example.cardapio.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserService {

    @Autowired
    private  UserRepository userRepository;

    @Autowired
    private NivelUsuarioRepository nivelUsuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User partialUpdate(Long id, Map<String, Object> updates) {
        //Busca de usuário pelo id

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário com id: " + id + "não encontrado"));

        updates.forEach((key, value) -> {
            switch (key) {
                case "login" -> user.setLogin((String) value);
                case "password" -> {
                    if(value instanceof String senha) {
                        user.setPassword(passwordEncoder.encode(senha));
                    }
                }
                case "nivel_id" -> {
                    if (value instanceof Number nivelId) {
                        NivelUsuario nivel = nivelUsuarioRepository.findById(nivelId.longValue())
                                .orElseThrow(() -> new RuntimeException("Nível não encontrado"));
                        user.setNivelId(nivel);
                    }
                }
            }
        });
        return userRepository.save(user);
    }
}