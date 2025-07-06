import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Carousel from '../components/carousel/Carousel';
import Navbar from '../components/navbar/Navbar';
import img1 from '../images/raposoempo.webp';
import img2 from '../images/raposoempo2.jpeg';
import img3 from '../images/raposoempo3.jpeg';
import logo from '../images/raposoempoA.jpeg';

export default function Home() {
    const carouselImages = [img1, img2, img3];

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
      };

    useEffect(() => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    }, []);
    console.log('isAuthenticated', isAuthenticated);
    const links = [
      { href: '#about', label: 'Sobre nós' },
      { href: '#contact', label: 'Contato' },
      { href: '#location', label: 'Localização' },
      ...(isAuthenticated ? [{ href: '/users', label: 'Users' }] : []),
      ...(isAuthenticated
        ? [{ href: '/login', label: 'Logout' }]
        : [{ href: '/login', label: 'Login' }]),
    ];
    return (
          <>
            <Navbar
                links={links.map((link) => ({
                ...link,
                onClick: link.label === 'Logout' ? handleLogout : undefined,
                }))}
            />
            <div className="home" id="home">
                <section className="home__section home__hero">
                    <h1>Bem-vindo ao Raposo Empório</h1>
                    <p>
                        <img src={logo} alt="" />
                    </p>
                    <p>
                        <>Seu destino para produtos importados, regionais e naturais de qualidade. Próximo ao Parque do Povo, a apenas um clique de você.
                        <br />Conheça nossos produtos e descubra sabores únicos!
                        </>
                    </p>
                    <p><i>Nosso site está em desenvolvimento, sempre buscando melhorar e evoluir para vocês</i></p>
                </section>
                <section className="home__section" id="about">
                    <h2>Sobre nós</h2>
                    <p>
                        No Raposo Empório, nossa missão é trazer uma experiência de sabores únicos para você.
                        Oferecemos produtos importados, regionais, naturais e de qualidade,
                        conectando tradição e sabor com o seu dia a dia. Trabalhamos com produtores e sabores selecionados cuidadosamente,
                         para que sua experiência seja única.
                    </p>
                    <Carousel images={carouselImages}/>
                    <p>
                        <strong style={{color: '#5c3d1b'}}>Horário de funcionamento:</strong> Segunda a Sábado, das 8h às 18h.
                    </p>
                    <h3>Nos Avalie</h3>
                    <p>
                        Nos avalie no Google Maps e ajude-nos a melhorar nossos serviços! Sua opinião é muito importante para nós.
                    </p>
                </section>

                <section className="home__section" id="contact">
                    <h2>Contato</h2>
                    <p>
                        Tem dúvidas, sugestões ou quer fazer um pedido? Entre em contato conosco por e-mail:
                        <strong> atendimento@raposoemporio.com.br </strong> ou pelo WhatsApp: <strong>(83) 99999-9999</strong>.
                    </p>
                </section>

                <section className="home__section" id="location">
                    <h2>Localização</h2>
                    <p>
                        Estamos localizados na região de Campina Grande/PB, próximo ao Parque do Povo. Oferecemos retirada local,
                        entrega por delivery, ou se preferir se sentar e conhecer mais um pouco nossa loja, temos um cantinho para você.
                    </p>
                    <div style={{ marginTop: '1rem' }}>
                        <iframe
                            title="Localização Raposo Empório"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.1509026930667!2d-35.88855112523992!3d-7.223622892782302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ac1f776bbde035%3A0xe54df0c440c0b0a8!2sRaposo%20Emp%C3%B3rio!5e0!3m2!1spt-BR!2sbr!4v1751778743070!5m2!1spt-BR!2sbr"
                            width="100%"
                            height="300"
                            style={{ border: 0, borderRadius: '0.5rem' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </section>
            </div>
        </>
    );
  }
  