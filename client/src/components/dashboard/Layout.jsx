import { Link, useLocation } from 'react-router-dom';
import { route } from '@/routes';
import Header from '@/components/dashboard/Header.jsx';
import SideBar from '@/components/dashboard/SideBar.jsx';
import Meters from '@/components/dashboard/Meters.jsx';
import '@/assets/css/main.css';
import '@/assets/css/dashboard.css';


export default function Layout({ children }) {
    const location = useLocation();

    return (
        <>
            <Header />

            <div className="container-fluid">
                <div className="row">

                    <SideBar />

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mb-5 pb-5">
                        <div
                            className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="fw-bold">Dashboard</h1>
                        </div>

                        { location.pathname == (route('dashboard')) &&
                        <Meters />
                        }

                        { children }

                    </main>
                </div>
            </div>
        </>
        
    )
}
