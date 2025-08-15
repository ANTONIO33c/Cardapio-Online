import './ListUser.css';
import { UseUserData } from '../hooks/UseUserData';
import {DeleteUser} from './DeleteUser'
import { UpdateFood } from './UpdateFood';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';



export function ListUser() {
    const {data} = UseUserData();

    return (
        <>
          <h1 className="page-title">Listagem de Usuários</h1>

<div className="user-list">
  {data?.map(UserData => (
    <div className="user-card" key={UserData.id}>
      <div className="user-info">
        <h3 className="user-name">{UserData.login}</h3>
        <p className="user-role">{UserData.nivelUsuario}</p>
      </div>

      <div className="user-actions">
        <DeleteUser itemId={UserData.id!} />
        <Link to={`/updateUser/${UserData.id}`}>
          <button className="btn edit">Editar</button>
        </Link>
      </div>
    </div>
  ))}
</div>


        </>
    )


}