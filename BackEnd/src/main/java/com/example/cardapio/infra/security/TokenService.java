package com.example.cardapio.infra.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.example.cardapio.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {


    @Value("${api.security.token.secret}")
    private String secret;

    public String generateToken(User user){
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            String token = JWT.create().withIssuer("api-cardapio")
                    .withSubject(user.getUsername())
                    .withExpiresAt(genExpirationData())
                    .sign(algorithm);
            return token;
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Error while genereting token", exception);

        }

    }
    private Instant genExpirationData() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }

    public String validadeToken(String token){
        try {
          Algorithm algorithm = Algorithm.HMAC256(secret);
          return JWT.require(algorithm)
                  .withIssuer("api-cardapio")
                  .build()
                  .verify(token)
                  .getSubject();
        } catch (JWTVerificationException exception) {
            return null;


        }


    }


}


