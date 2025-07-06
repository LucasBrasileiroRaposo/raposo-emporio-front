import './Popout.css';

export default function Popout({ type, message }) {
  return (
    <div className={`popout ${type}`}>
      {message}
    </div>
  );
}
