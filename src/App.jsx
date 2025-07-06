import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Users from './pages/Users';
import UpdateUser from './pages/UpdateUser';
import Footer from './components/footer/Footer';
import NotFound from './pages/NotFound';
import './App.css';

export default function App() {
  return (
    <div className="app-wrapper">
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/users" element={<Users />} />
          <Route path="/update-user/:id" element={<UpdateUser />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );

}