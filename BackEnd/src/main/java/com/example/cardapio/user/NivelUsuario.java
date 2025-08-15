package com.example.cardapio.user;
import jakarta.persistence.*;


@Entity
@Table(name = "nivel_usuario")


public class NivelUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String descricao;

    // getters e setters

    public Long getId(){return id;}
    public void setId(Long id){this.id = id;}

    public String getDescricao(){return descricao;}
    public void setDescricao(String descricao){this.descricao = descricao;}



}
