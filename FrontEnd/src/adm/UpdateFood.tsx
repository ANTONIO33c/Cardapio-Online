import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// import styles from "./UpdateFood.css"
import "./UpdateFood.css"

export function UpdateFood() {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();

  const [food, setFood] = useState({
    title: '',
    price: 0,
    image: ''
  });

  // Carrega os dados do produto
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/food/${itemId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao buscar dados");
        return res.json();
      })
      .then(data => setFood(data))
      .catch(err => {
        alert("Erro ao carregar dados do item");
        console.error(err);
      });
  }, [itemId]);

  // Atualiza estado ao editar inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFood({ ...food, [name]: name === 'price' ? parseFloat(value) : value });
  };

  // Envia os dados atualizados para o backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    console.log("token: ", token);

    try {
      const response = await fetch(`http://localhost:8080/food/${itemId}`, {
        method: "PATCH",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(food)
      });

      if (response.ok) {
        alert("Item atualizado com sucesso!");
        navigate('/ListProd');
      } else {
        alert("Erro ao atualizar o item");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor");
      console.log(error);
    }
  };

  return (
    <div className="update-container">
     
      <form onSubmit={handleSubmit} className="form-update">
         <h2>Editar Produto</h2>
        <div>
          <label className="label-name">Title</label>
          <input
            type="text"
            name="title"
            value={food.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="label-name">Price</label>
          <input
            type="number"
            name="price"
            step="0.01"
            value={food.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="label-name-img-url">Imagem (URL)</label>
          <input
            type="text"
            name="image"
            value={food.image}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" onClick={handleSubmit} className="btn-update">Salvar</button>
      </form>

      <Link className="login-button" to="/adm" style={{ marginLeft: 10 }}>
        Voltar para Área ADM
      </Link>
    </div>
  );
}
