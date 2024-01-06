import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';


const swalUnauthAlert = (error) => {
    const navigate = useNavigate();
    
    if (error.response.status === 401 && error.response.statusText === 'Unauthorized') {
        swal.fire({
            title: 'You are not logged in!',
            icon: 'error',
            toast: true,
            timer: 6000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        })
        navigate(route('sign-in'))
    }
}

export default swalUnauthAlert;