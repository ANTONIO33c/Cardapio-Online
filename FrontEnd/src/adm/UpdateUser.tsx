import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./UpdateUser.css";


export function UpdateUser() {
  const { userid } = useParams<{ userid: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    login: '',
    password: '',
     nivel_id: 0
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/auth/${userid}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
       .then(res => {
      if (!res.ok) throw new Error("Erro ao buscar dados");
      return res.json();
    })
    .then(data => {
        
      setUser({
        login: data.login,
        password: data.password,
        nivel_id: data.nivel.id 
      });
    })
    .catch(err => {
      alert("Erro ao carregar dados do usuário");
      console.error(err);
    });
}, [userid]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleNivelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUser({ ...user, nivel_id: parseInt(e.target.value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:8080/auth/${userid}`, {
        method: "PATCH",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        alert("Usuário atualizado com sucesso!");
        navigate('/ListUser');
      } else {
        alert("Erro ao atualizar o usuário");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor");
      console.error(error);
    }
  };

  return (
    <div className="container" onClick={(e) => e.stopPropagation()}>
     
      <form className="input-container" onSubmit={handleSubmit}>
         <h2 className="modal-title">Atualizar Usuário</h2>
         <br />
        <label className="label-login">Username</label>
        <input
          type="text"
          name="login"
          value={user.login}
          onChange={handleChange}
          required
        />

        <label className="label-password">Password</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <select value={user.nivel_id} onChange={handleNivelChange} required className="select-nivel">
          <option value="">Selecione um nível</option>
          <option value={1}>Administrador</option>
          <option value={2}>Usuário</option>
          <option value={3}>Cliente</option>
        </select>
        <br />

        <button type="submit" className="btn-salvar">Salvar</button>
      </form>
      <Link className="login-button" to="/adm" style={{ marginLeft: 10 }}>
        Voltar para Área ADM
      </Link>
    </div>
  );
}
