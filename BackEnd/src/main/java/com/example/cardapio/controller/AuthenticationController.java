package com.example.cardapio.controller;

import com.example.cardapio.food.FoodResponseDTO;
import com.example.cardapio.infra.security.TokenService;
import com.example.cardapio.repositories.UserRepository;
import com.example.cardapio.user.*;
import com.example.cardapio.user.NivelUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private com.example.cardapio.user.NivelUsuarioRepository nivelUsuarioRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserService userService;


    //Listar todos os usuários
    @GetMapping("/users")
    public ResponseEntity<?> ListaAll(){
        return ResponseEntity.ok(userRepository.findAll());
    }

//     metodo de DELETE

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    //    consulta de usuário por id
    @GetMapping("/{id}")
    public ResponseEntity<AuthenticationDTO> getById(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> ResponseEntity.ok(new AuthenticationDTO(user.getUsername(), user.getPassword(), user.getNivel())))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid AuthenticationDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var authentication = authenticationManager.authenticate(usernamePassword);

        var user = (User) authentication.getPrincipal();
        var token = tokenService.generateToken(user);
        float nivelId = user.getNivel().getId();

        return ResponseEntity.ok(new LoginResponseDTO(token, (long) nivelId));
    }


    @PostMapping("/register")
    public ResponseEntity<?> criarUsuario(@RequestBody @Valid RegisterDTO data) {
        if (data.nivelUsuario() == null) {
            return ResponseEntity.badRequest().body("O nível de usuário deve ser informado.");
        }

        NivelUsuario nivel = nivelUsuarioRepository.findById(data.nivelUsuario())
                .orElseThrow(() -> new RuntimeException("Nível de usuário não encontrado"));

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());

        User user = new User(data.login(), encryptedPassword, nivel);
        userRepository.save(user);

        return ResponseEntity.ok("Usuário criado com sucesso!");
    }
    @PatchMapping("/{id}")
    public ResponseEntity<User> atualizarParcialmenteUsuario(
            @PathVariable Long id,
            @RequestBody Map<String, Object> updates) {

        User usuarioAtualizado = userService.partialUpdate(id, updates);
        return ResponseEntity.ok(usuarioAtualizado);
    }

}
