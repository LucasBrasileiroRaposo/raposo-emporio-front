import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import './Users.css';

export default function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:8080/user/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUsers(data.response || []);
    } catch (err) {
      setPopout({ type: 'error', message: 'Erro ao carregar usuários' });
    }
  };

  const handleEdit = (id) => {
    navigate(`/update-user/${id}`);
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return;

    try {
      await fetch(`http://localhost:8080/user/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers();
    } catch {
      setPopout({ type: 'error', message: 'Erro ao excluir usuário' });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };


  const links = [
    { href: '/', label: 'Início' },
    { label: 'Logout', onClick: handleLogout}
  ]

  return (
    <>
      <Navbar
        links={links.map((link) => ({
          ...link,
          onClick: link.label === 'Logout' ? handleLogout : undefined,
        }))}
      />
      <main className="users-container">
        <h2 className="users-title">Usuários Cadastrados</h2>
        <table className="users-table">
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Email</th>
              <th>Cidade</th>
              <th>Tipo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.city}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleEdit(user.id)} className="edit-btn">Editar</button>
                  <button onClick={() => handleDelete(user.id)} className="delete-btn">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
