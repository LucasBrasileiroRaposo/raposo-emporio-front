import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Button from '../components/button/Button';
import Popout from '../components/popout/Popout';
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [popout, setPopout] = useState(null);
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem('token');
  if (isAuthenticated) {
    return <Navigate to="/users" replace />;
  }

  useEffect(() => {
    if (popout) {
      const timer = setTimeout(() => setPopout(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [popout]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user-id', data.id);
        setPopout({ type: 'success', message: 'Login realizado com sucesso!' });
        setTimeout(() => navigate('/users'), 1000);
      } else {
        setPopout({ type: 'error', message: data.error });
      }
    } catch {
      setPopout({ type: 'error', message: 'Erro ao fazer login.' });
    }
  };

  return (
    <>
      <Navbar links={[{ href: '/', label: 'Início' }]} />
      <section className="login-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome de usuário"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className='button-wrapper'>
            <Button className="login-button" type="submit">Entrar</Button>
          </div>
        </form>
        <p className="login-footer">
          Não tem conta? <a href="/signup">Cadastre-se</a>
        </p>
        {popout && <Popout type={popout.type} message={popout.message} />}
      </section>
    </>
  );
}
