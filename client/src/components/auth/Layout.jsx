import { Link, useLocation } from 'react-router-dom';
import { route } from '@/routes';
import '@/assets/css/main.css';
import '@/assets/css/auth.css';
import Logo from '@/assets/images/logo.png';
import Meals from '@/assets/images/meals.jpeg';


export default function Layout({ children }) {
    const location = useLocation();

    return (
        <>
            <header style={{ position: 'fixed', top: '20px', right: '3rem' }}>
                <ul className="d-flex gap-3" style={{ color: '#E35F21' }}>
                    <Link to={ route('home') }>
                        <li className="fs-5 fw-semibold" style={{ listStyle: 'none' }}>Home</li>
                    </Link>
                    { location.pathname == route('sign-in') ?
                        <Link to={ route('sign-up') }>
                            <li className="fs-5 fw-semibold" style={{ listStyle: 'none' }}>Sign up</li>
                        </Link>
                        : 
                        <Link to={ route('sign-in') }>
                            <li className="fs-5 fw-semibold" style={{ listStyle: 'none' }}>Sign in</li>
                        </Link>
                    }
                </ul>
            </header>

            <main className="container-fluid">
                <div className="row vh-100">
                    <div className="d-none d-md-block col-md-6" style={{ backgroundImage: `url(${Meals})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundColor: 'rgba(0, 0, 0, 0.67)', backgroundBlendMode: 'multiply' }}>
                        <div className="d-flex flex-column align-items-start position-absolute" style={{ top: '40%', left: '7%' }}>
                            <img src={Logo} className="z-3" alt="" width="400" />
                            <span className="fs-4 fw-bold align-self-end" style={{ color: '#E35F21', marginTop: '-3rem' }}>Mahlzeit</span>
                        </div>
                    </div>

                    

                    <div className="col-sm-12 col-md-6 mt-5">
                        <div className="h-100 d-flex flex-column justify-content-center px-5">
                            <div className="mb-4">
                                <img src={Logo} className="d-block d-md-none z-3" alt="" width="200" />
                            </div>
                        
                            { children }
                            <p className="mt-5 mb-3 text-body-secondary text-end">&copy; 2017–{new Date().getFullYear()}</p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}