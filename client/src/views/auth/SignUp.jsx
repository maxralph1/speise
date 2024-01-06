import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { route } from '@/routes';
import swal from 'sweetalert2';
import AuthContext from '@/context/AuthContext';
import Layout from '@/components/auth/Layout';
import '@/assets/css/auth.css';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    let {signUpUser} = useContext(AuthContext);

    const handleSubmit = async e => {
        e.preventDefault();
        if (password == password2) {
            signUpUser(email, firstname, lastname, username, password)
        } else {
            swal.fire({
                title: 'Given passwords do not match',
                icon: 'error',
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    return (
        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="form-floating">
                    <input 
                        name="email" 
                        id="email" 
                        type="email" 
                        className="form-control rounded-0" 
                        placeholder="name@example.com" 
                        onChange={e => setEmail(e.target.value)} />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating">
                    <input 
                        name="username" 
                        id="username" 
                        type="text" 
                        className="form-control rounded-0" 
                        placeholder="user123" 
                        onChange={e => setUsername(e.target.value)} />
                    <label htmlFor="username">Username</label>
                </div>
                <div className="form-floating">
                    <input 
                        name="firstname" 
                        id="firstname" 
                        type="text" 
                        className="form-control rounded-0" 
                        placeholder="John" 
                        onChange={e => setFirstname(e.target.value)} />
                    <label htmlFor="firstname">First Name</label>
                </div>
                <div className="form-floating">
                    <input 
                        name="lastname" 
                        id="lastname" 
                        type="text" 
                        className="form-control rounded-0" 
                        placeholder="John" 
                        onChange={e => setLastname(e.target.value)} />
                    <label htmlFor="lastname">Last Name</label>
                </div>
                <div className="form-floating mb-0 pb-0">
                    <input 
                        name="password" 
                        id="password" 
                        type="password" 
                        className="form-control rounded-0"
                        placeholder="Password" 
                        autoComplete="off" 
                        onChange={e => setPassword(e.target.value)} />
                    <label htmlFor="password">Password</label>
                </div>
                <div className="form-floating mt-0 pt-0">
                    <input 
                        name="password2" 
                        id="password2" 
                        type="password" 
                        className="form-control rounded-0"
                        placeholder="Repeat Password" 
                        autoComplete="off" 
                        onChange={e => setPassword2(e.target.value)} />
                    <label htmlFor="password">Repeat Password</label>
                </div>
            
                <div className='d-flex justify-content-end mt-3'>
                    <button className="btn btn-secondary py-2 px-4 rounded-0" type="submit">Sign up</button>
                </div>
            </form>
        </Layout>
    )
}
