import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { route } from '@/routes';
import useAxios from '@/utils/useAxios';
import swalUnauthAlert from '@/components/swalUnauthAlert';


export function useAccount(username = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    useEffect(() => {
        if (username !== null) {
            const controller = new AbortController();
            getAccount(username, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [username]);

    async function createAccount(account) {
        setLoading(true);
        setErrors({});

        console.log(account)
        return axiosInstance.post('accounts/', account)
            .then(() => navigate(route('dashboard.accounts.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function getAccount(username, { signal } = {}) {
        setLoading(true);

        return axios.get(`http://127.0.0.1:8000/api/accounts/${username}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function updateAccount(account) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`accounts/${account.username}/`, account)
            .then(() => navigate(route('dashboard.accounts.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function destroyAccount(account) {
        return axiosInstance.delete(`accounts/${account.username}/`)
            .then(() => navigate(route('dashboard.accounts.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    return {
        account: { data, setData, errors, loading }, 
        getAccount, 
        createAccount, 
        updateAccount, 
        destroyAccount
    }
}