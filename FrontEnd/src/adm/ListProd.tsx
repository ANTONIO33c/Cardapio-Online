import './ListProd.css';
import { useFoodData } from '../hooks/useFoodData';
import {DeleteFood} from './DeleteFood'
import { UpdateFood } from './UpdateFood';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function ListProd() {
    const { data } = useFoodData();



    return (
        <>
            <h1 className='title-list-prod'>Listagem de Produto</h1>
            <div className="card-list">
                {data?.map(foodData => (
                    <div className="card-row" key={foodData.id}>
                        <img src={foodData.image} alt={foodData.title} className="product-image" />

                        <div className="product-info">
                            <h3>{foodData.title}</h3>
                            <p>R$ {foodData.price.toFixed(2)}</p>
                        </div>

                        <div className="product-actions">
                                    {/* Botão de deletar */}
                                    <DeleteFood itemId={foodData.id!} /> 
                                    {/* botão de editar */}
                                    <Link to={`/update/${foodData.id}`}>
                             <button className="btn alter">Editar</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ListProd;
