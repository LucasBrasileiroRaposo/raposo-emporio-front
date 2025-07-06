import { HashLink } from 'react-router-hash-link';
import './Logo.css'; 

export default function Logo() {
  return (
    <HashLink className='logo' smooth to="/">Raposo Empório</HashLink>
  );
}