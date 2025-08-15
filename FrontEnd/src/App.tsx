import './App.css';
import { Card } from './components/card/card';
import { useFoodData } from './hooks/useFoodData';
import Login from './login/Login';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Adm  from './adm/Adm';
import ListProd from './adm/ListProd';
import { UpdateFood } from './adm/UpdateFood';
import {ListUser} from './adm/ListUser';
import {UpdateUser} from './adm/UpdateUser';


function App() {
  const { data } = useFoodData();

  return (
    <Router>
      <div className="container">
        <nav>
          <Link className='login-button' to="/login">Àrea Administrativa</Link>
          {/* <Link to="/" style={{ marginLeft: 10 }}>Voltar para Home</Link> */}
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Cardápio</h1>
                <div className="card-grid">
                  {data?.map(foodData => (
                    <Card
                      key={foodData.id} // sempre bom usar key
                      price={foodData.price}
                      title={foodData.title}
                      image={foodData.image}
                    />
                  ))}
                 
                </div>
              </>
            }
          />
          <Route path="/login" element={<Login />} />
           <Route path="/adm" element={<Adm />} /> 
             <Route path="/ListProd" element={<ListProd />} /> 
             <Route path="/ListUser" element={<ListUser />} /> 
             <Route path="/update/:itemId" element={<UpdateFood />} />
             <Route path="/updateUser/:userid" element={<UpdateUser />} />
          
          {/* <Route path="/home" element={<HomePage />} /> NOVO */}
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
