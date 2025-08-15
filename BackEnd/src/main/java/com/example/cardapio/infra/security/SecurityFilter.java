package com.example.cardapio.infra.security;

import com.example.cardapio.repositories.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

//        String path = request.getRequestURI();
//
//        // Ignora autenticação para rotas públicas
//        if (path.equals("/auth/login") || path.equals("/auth/register") || path.equals("/foods")) {
//            filterChain.doFilter(request, response);
//            return;
//        }

        var token = this.recoverToken(request);
        if (token != null) {
            var login = tokenService.validadeToken(token); // 'validade' provavelmente é 'validate'

            if (login != null) {
                UserDetails user = userRepository.findByLogin(login);

                if (user != null) {
                    var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } else {
                    System.out.println("⚠️ Usuário não encontrado no banco para login: " + login);
                }
            } else {
                System.out.println("⚠️ Token inválido");
            }
        }
        filterChain.doFilter(request, response);
    }
    public String recoverToken(HttpServletRequest request) {
        var authReader = request.getHeader("Authorization");
        if (authReader == null) return null;
        return authReader.replace("Bearer ", "");
    }


}