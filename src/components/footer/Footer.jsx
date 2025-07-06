import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} Raposo Empório. Todos os direitos reservados.
    </footer>
  );
}