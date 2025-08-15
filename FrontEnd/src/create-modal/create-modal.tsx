import React, { useEffect, useState } from 'react';
import { useFoodDataMutate } from '../hooks/useFoodDataMutate';
import type { FoodData } from '../interface/FoodData';
import './modal.css';
import Login from '../login/Login';
import { Navigate, redirect } from 'react-router-dom';
import ListProd from '../adm/ListProd';

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

// Props para o modal (vazias por enquanto)
interface CreateModalProps {}

export function CreateModal({closeModal}: ModalProps)  {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const {mutate, isSuccess} = useFoodDataMutate();
   
   const submit = () => {
     

    
    
     const priceFormatado = price.replace(',', '.');

    if (!title || !image || isNaN(Number(priceFormatado))) {
    alert("Preencha todos os campos corretamente");
    return;
  }
  
   const token = localStorage.getItem('token');
  console.log("Token atual:", token); //
  
  const foodData: FoodData = {
    title,
    price: Number(priceFormatado),
    image,
  };
  mutate(foodData);
};
    useEffect(() => {
  if (!isSuccess) return;
  alert("Produto inserido com sucesso!");
  closeModal();
}, [isSuccess]);


  return (
   <div className="modal-overlay" onClick={() => closeModal()}>
    
  <div className="modal-content"  onClick={(e) => e.stopPropagation()}>
    <h2 className="modal-title">Cadastre um novo item no cardápio</h2>
    <div className="input-container">
      <Input label="Title" value={title} updateValue={setTitle} />
      <Input label="Price" value={price} updateValue={setPrice} />
      <Input label="Image" value={image} updateValue={setImage} />
    <div className="input-wrapper">
 
</div>
 <input type="button" value="Adicionar novo item" onClick={submit} className="button-secundery"/>

 
    </div>
  </div>
</div>
  );
}
function enviar() {
  
}