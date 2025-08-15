import React from "react";
import Login from '../login/Login'
import  './DeleteFood.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';



export function DeleteFood({itemId} : {itemId : number}){
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Tem Certeza que deseja excluir esse produto?");

    if(confirmDelete){

        const token = localStorage.getItem('token');
       
      try{
        const response = await fetch(`http://localhost:8080/food/${itemId}`, {method: 'DELETE',
            headers: {
            'Authorization': `Bearer ${token}`,  // envia token no formato esperado
            'Content-Type': 'application/json'   // geralmente bom informar
          },
        });
        if (response.ok) {
          alert('Item Excluido com sucesso!');
          window.location.reload(); // Recarrega a página
        } else {
          alert('Erro ao Excluir o objeto')
        }
      } catch (error) {
        alert('Erro ao conectar com o servidor.');
        console.error('Erro:', error)
      }
    }
  }
  

  return (
    <>
    
    <button onClick={handleDelete} className="btn btn-delete">Delete</button>

        {/* Bread Crumb */}
        <Link className="login-button" to="/adm" style={{ marginLeft: 10 }}>
        Voltar para Àrea ADM
        </Link>
   
      </>
  );

}

