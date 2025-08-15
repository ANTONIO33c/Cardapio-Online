// src/login/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import { useFoodDataMutate } from '../hooks/useFoodDataMutate';
import Adm from '../adm/Adm';



 const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  
  
     try {
  const response = await axios.post('http://localhost:8080/auth/login', { login, password });

  const token = response.data.token; // pega meu token após a requisição e armazana na veriavél token
  const nivelId = response.data.nivel_user; // pega o nivel do usuário e armazena na variavel nivelId

  if(token) {
    if(token != undefined && token != null )
    {
      console.log('token,', token)
      localStorage.setItem('token', token.toString());

    }
    
  }

  if (nivelId !== undefined && nivelId !== null) {
    localStorage.setItem('nivel_id', nivelId.toString());
    console.log('Nivel do usuário:', nivelId);

    if (nivelId === 1) {
      navigate('/adm');
    } else {
      navigate('/home');
    }
  } 

} catch (err: any) {
  setSnackbarMessage('Erro ao logar, por favor verifique as informações digitadas');
  setSnackbarSeverity('error');
  setSnackbarOpen(true);
}
  }
  
  

      const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
  if (reason === 'clickaway') return;
  setSnackbarOpen(false);
};

  return (
    <>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className='btn-login'>Entrar</button>
      </form>

      <div>
        {/* Bread Crumb */}
        <Link className="login-button" to="/" style={{ marginLeft: 10 }}>
          Voltar para Home
        </Link>
      </div>
       {/* Snackbar */}
    <Snackbar
  open={snackbarOpen}
  autoHideDuration={4000}
  onClose={handleCloseSnackbar}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
>
  <Alert
    onClose={handleCloseSnackbar}
    severity={snackbarSeverity} // controla cor e ícone
    variant="filled"
  >
    {snackbarMessage}
  </Alert>
</Snackbar>
    </>
  );
};
export default Login;
