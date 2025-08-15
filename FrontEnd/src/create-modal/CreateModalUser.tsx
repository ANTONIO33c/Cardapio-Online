import React, { useEffect, useState } from 'react';
import { useUserDataMutate } from '../hooks/useUserDataMutate';
import type { UserData } from '../interface/UserData';
import './modal.css';
import Login from '../login/Login';
import { Navigate, redirect } from 'react-router-dom';
import ListProd from '../adm/ListProd';
import Adm from '../adm/Adm';


// Props para o componente de Input
interface InputProps {
  label: string;
  value: string | number;
  updateValue: (value: any) => void;
}
interface ModalProps {
  closeModal():void;
}
// Componente de Input
const Input: React.FC<InputProps> = ({ label, value, updateValue }) => {
  return (
    <div className="input-wrapper">
      <label>{label}</label>
      <input
        value={value}
        onChange={(event) => updateValue(event.target.value)}
      />
    </div>
  );
};

// Create User

export function CreateModalUser({closeModal}: ModalProps) {
    const [login, SetLogin] = useState("");
    const [password, SetPassword] = useState("");
    const [nivelUsuario, SetNivelUsuario] = useState("");
    const {mutate, isSuccess} = useUserDataMutate();

    const submit = () => {
        console.log("botao clicado")
      if (login === "" || password === "" || nivelUsuario === ""|| isNaN(Number(nivelUsuario))) {
        alert("Preencha todos os campos corretamente, incluindo o nível de usuário.");
        return;
}
         const token = localStorage.getItem('token');
        console.log("Token atual:", token); 

         const UserData: UserData = {
            login,
            password,
           nivelUsuario: Number(nivelUsuario),
          };
          mutate(UserData);

          console.log('Dados a enviar:', {
  login,
  password,
  nivelUsuario: Number(nivelUsuario),
});
    };
     useEffect(() => {
      if (!isSuccess) return;
      alert("Usuário inserido com sucesso!");
      closeModal();
    }, [isSuccess]);

    return (
   <div className="modal-overlay" onClick={() => closeModal()}>
    
  <div className="modal-content-user"  onClick={(e) => e.stopPropagation()}>
    <h2 className="modal-title-user">Cadastre um novo usuário no sistema</h2>
    <div className="input-container">
      <Input label="Login" value={login} updateValue={SetLogin} />
      <label htmlFor="Password">Password</label>
      <input type='password' id='password' value={password} onChange={(e) => SetPassword(e.target.value)}/>
      <label>Nível</label>
    <select value={nivelUsuario} onChange={(e) => SetNivelUsuario(e.target.value)}>
        <option value="">Selecione um nível</option>
         <option value="1">Administrador</option>
        <option value="2">Usuário</option>
        <option value="3">Cliente</option>
</select>

    <div className="input-wrapper">
 
</div>
 <input type="button" value="Adicionar novo usuário" onClick={submit} className="button-create-user"/>
 

 
    </div>
  </div>
</div>
  );
}