import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './adm.css'
import { CreateModalUser} from '../create-modal/CreateModalUser';
import { CreateModal} from '../create-modal/create-modal';
import { useModal } from '../hooks/useModal';
import { useFoodData } from '../hooks/useFoodData';



function Adm() {
     const { data } = useFoodData();
     const { isProductModalOpen, isUserModalOpen, closeProductModal, closeUserModal, openProductModal, openUserModal } = useModal();

    
  return (
    
    

     <div className='container-adm'>
       <h1 className='title-adm'>ÁREA ADMINISTRATIVA</h1>
       <div className='group-itens'>
       <div className='group-produtos'>
        <label htmlFor="" className='title-produtos'>PRODUTOS</label>
       <div className='group-button'>
        
         {isProductModalOpen && <CreateModal closeModal={closeProductModal} />}
                  { 
                    <button onClick={openProductModal} id=""> Cadastro de Produto </button>  
                  }
               <Link to="/ListProd" id='List_Prod'>Listagem de Produto</Link>
               
                  </div>
                  </div>
                  <div className='group-users'>
                   <label htmlFor="" className='title-users'>USUÁRIOS</label>
                   <div className='group-buttons-users'>
                   {isUserModalOpen && <CreateModalUser closeModal={closeUserModal} />}
                  { 
                    <button onClick={openUserModal} id=""> Cadastro de Usuário </button>  
                  }
                    <Link to="/ListUser" className='list-users'>Listagem de Produto</Link>
                   </div>

                  </div>
                  </div>
                

        {/* Bread Crumb */}
        <Link className="login-button" to="/login" style={{ marginLeft: 10 }}>
          Voltar para Login
        </Link>
      </div>
  );
}

export default Adm;
