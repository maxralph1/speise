import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { route } from '@/routes';
import AuthContext from '@/context/AuthContext';
import Layout from '@/components/auth/Layout';
import '@/assets/css/main.css';
import '@/assets/css/auth.css';

export default function SignIn() {
    const {signInUser} = useContext(AuthContext);

    const handleSubmit = e => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        username.length > 0 && signInUser(username, password);
    }

    return (
        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="form-floating">
                    <input name="username" id="username" type="text" className="form-control rounded-0" placeholder="user123" />
                    <label htmlFor="username">Username</label>
                </div>
                <div className="form-floating">
                    <input name="password" id="password" type="password" className="form-control rounded-0" placeholder="Password" autoComplete="off" />
                    <label htmlFor="password">Password</label>
                </div>
            
                <div className="form-check text-start my-3">
                    <input className="form-check-input rounded-0" type="checkbox" value="remember-me" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Remember me
                    </label>
                </div>
                <div className='d-flex justify-content-end'>
                    <button className="btn btn-secondary py-2 px-4 rounded-0" type="submit">Sign in</button>
                </div>
                
            </form>
        </Layout>
    )
}
