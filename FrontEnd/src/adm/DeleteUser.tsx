import React from "react";
import Login from '../login/Login'
import  './DeleteFood.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';



export function DeleteUser({itemId} : {itemId : number}){
  const handleDeleteUser = async () => {
    const confirmDelete = window.confirm("Tem Certeza que deseja excluir esse usuário?");

    if(confirmDelete){

        const token = localStorage.getItem('token');
       
      try{
        const response = await fetch(`http://localhost:8080/auth/${itemId}`, {method: 'DELETE',
            headers: {
            'Authorization': `Bearer ${token}`,  // envia token no formato esperado
            'Content-Type': 'application/json'   // geralmente bom informar
          },
        });
        if (response.ok) {
          alert('Usuário Excluido com sucesso!');
          window.location.reload(); // Recarrega a página
        } else {
          alert('Erro ao Excluir o usuário')
        }
      } catch (error) {
        alert('Erro ao conectar com o servidor.');
        console.error('Erro:', error)
      }
    }
  }
  

  return (
    <>
    
    <button onClick={handleDeleteUser} className="btn btn-delete">Delete</button>

        {/* Bread Crumb */}
        <Link className="login-button" to="/adm" style={{ marginLeft: 10 }}>
        Voltar para Àrea ADM
        </Link>
   
      </>
  );

}