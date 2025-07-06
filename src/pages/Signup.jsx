import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Button from '../components/button/Button';
import Popout from '../components/popout/Popout';
import './Signup.css';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    birth_date: '',
    email: '',
    document: '',
    phone: '',
    cep: '',
    address: '',
    city: '',
    state: '',
    role: 'USER',
  });
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

  const handleCepSearch = async () => {
    const cep = formData.cep.replace(/\D/g, '');
    if (cep.length !== 8) return;

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setFormData(prev => ({
          ...prev,
          address: data.logradouro || '',
          city: data.localidade || '',
          state: data.uf || '',
        }));
      } else {
        setPopout({ type: 'error', message: 'CEP inválido.' });
      }
    } catch {
      setPopout({ type: 'error', message: 'Erro ao buscar CEP.' });
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/user/signUp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setPopout({ type: 'success', message: 'Cadastro realizado! Faça login.' });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setPopout({ type: 'error', message: data.error });
      }
    } catch {
      setPopout({ type: 'error', message: 'Erro ao cadastrar usuário.' });
    }
  };

  return (
    <>
      <Navbar links={[{ href: '/', label: 'Início' }]} />
      <section className="signup-container">
        <h2 className="signup-title">Cadastro de Usuário</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input name="username" placeholder="Usuário" value={formData.username} onChange={handleChange} required />
            <input name="password" type="password" placeholder="Senha" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <input name="first_name" placeholder="Nome" value={formData.first_name} onChange={handleChange} required />
            <input name="last_name" placeholder="Sobrenome" value={formData.last_name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <input name="birth_date" type="date" value={formData.birth_date} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <input name="document" placeholder="Documento" value={formData.document} onChange={handleChange} required />
            <input name="phone" placeholder="Celular" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <input name="cep" placeholder="CEP" value={formData.cep} onChange={handleChange} onBlur={handleCepSearch} required />
          </div>

          <div className="form-group">
            <input name="address" placeholder="Rua" value={formData.address} onChange={handleChange} required />
            <input name="city" placeholder="Cidade" value={formData.city} onChange={handleChange} required />
            <input name="state" placeholder="Estado" value={formData.state} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <div className="button-wrapper">
            <Button type="submit" className="signup-button">Cadastrar</Button>
          </div>
        </form>
        {popout && <Popout type={popout.type} message={popout.message} />}
        <p className="signup-footer">Já é cliente? <a href="/login">Login</a></p>
      </section>
    </>
  );
}
