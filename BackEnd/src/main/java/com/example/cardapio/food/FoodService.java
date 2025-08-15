package com.example.cardapio.food;


import com.example.cardapio.repositories.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Map;

@Service
public class FoodService {
    @Autowired
    private FoodRepository repository;

    public Food partialUpdate(Long id, Map<String, Object> updates) {
        Food food = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food não encontrado com id " + id));

        updates.forEach((key, value) -> {
            switch (key) {
                case "title" -> food.setTitle((String) value);
                case "image" -> food.setImage((String) value);
                case "price" -> {
                    if (value instanceof Number number) {
                        food.setPrice(BigDecimal.valueOf(number.floatValue())); // cast seguro
                    }
                }
                // você pode adicionar mais campos aqui se necessário
            }
        });

        return repository.save(food);
    }


}

