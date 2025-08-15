package com.example.cardapio.controller;

import com.example.cardapio.food.*;
import com.example.cardapio.repositories.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("food")
@CrossOrigin(origins = "http://localhost:5173")
public class FoodController {

    @Autowired
    private FoodRepository repository;
    @PostMapping
    public void saveFood(@RequestBody FoodRequestDTO data){
        Food foodData = new Food(data);
        repository.save(foodData);

    }

    //liberação do CORS
    @CrossOrigin(origins = "*", allowedHeaders = "*")

    // consulta todos os objetos
    @GetMapping
    public List<FoodResponseDTO> getAll() {
        List<FoodResponseDTO> foodlist = repository.findAll().stream().map(FoodResponseDTO::new).toList();
        return foodlist;
    }
//    consulta de objeto por id
    @GetMapping("/{id}")
    public ResponseEntity<FoodResponseDTO> getById(@PathVariable Long id) {
        return repository.findById(id)
                .map(food -> ResponseEntity.ok(new FoodResponseDTO(food)))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    @Autowired
    private FoodService service;


    @PatchMapping("/{id}")
    public ResponseEntity<Food>updateFood(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        Food updated = service.partialUpdate(id, updates);
        return ResponseEntity.ok(updated);
    }


}
