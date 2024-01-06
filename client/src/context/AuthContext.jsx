import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import swal from 'sweetalert2';

const AuthContext = createContext();

export default AuthContext;


export const AuthProvider = ({children}) => {
    const [authTokens, setAuthTokens] = useState(() => 
        localStorage.getItem('authTokens') 
            ? JSON.parse(localStorage.getItem('authTokens')) 
            : null);
    const [user, setUser] = useState(() => 
        localStorage.getItem('authTokens') 
            ? jwtDecode(localStorage.getItem('authTokens')) 
            : null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    let signInUser = async (username, password) => {
        const response = await fetch('http://127.0.0.1:8000/api/auth/token/', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                username, 
                password 
            })
        })
        const data = await response.json()

        if (response.status == 200) {
            console.log('Logged in');
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            navigate('/dashboard');
            swal.fire({
                title: 'Sign in Successful',
                icon: 'success',
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        } else {
            console.log(response.status);
            console.log(response);
            // console.log(error);
            console.log('Something went wrong!');
            swal.fire({
                title: 'Username or password does not exists',
                icon: 'error',
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }


    const signUpUser = async (email, firstname, lastname, username, password) => {
        const response = await fetch('http://127.0.0.1:8000/api/auth/register/', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                email, 
                first_name: firstname, 
                last_name: lastname, 
                username, 
                password 
            })
        })

        if (response.status == 201) {
            navigate('/sign-in')
            swal.fire({
                title: 'Registration Successful, Sign in Now',
                icon: 'success',
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false, 
            })
        } else {
            console.log(response.status);
            console.log(response);
            console.log('Something went wrong!');
            swal.fire({
                title: 'An Error Occured ' + response.status + ': Check the password (ensure alphanumeric password not less than 15 characters). You should also check the other details you entered.',
                icon: 'error',
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }


    let logoutUser = async () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens'); 
        await fetch('http://127.0.0.1:8000/api/auth/logout/blacklist/', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                refresh: authTokens?.refresh, 
            })
        })
        navigate('/sign-in')
        swal.fire({
            title: 'You have been logged out.',
            icon: 'success',
            toast: true,
            timer: 6000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        })
    }


    let contextData = {
        user, 
        setUser, 
        authTokens, 
        setAuthTokens, 
        signInUser, 
        signUpUser, 
        logoutUser, 
    }


    useEffect(() => {
        if (authTokens) setUser(jwtDecode(authTokens.access));
        setLoading(false)
    }, [authTokens, loading])


    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}