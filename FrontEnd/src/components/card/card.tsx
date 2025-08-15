import React from 'react';
import './card.css'

interface CardProps {
  price: number;
  title: string;
  image: string;
}

export function Card({ price, title, image }: CardProps) {
  // Formata o preço para moeda brasileira
  const precoFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);

  return (
    <div className="card">
      <img src={image} alt={title} />
      <h3 className='title-image'>{title}</h3>
       <p>{precoFormatado}</p>
    </div>
  );
}