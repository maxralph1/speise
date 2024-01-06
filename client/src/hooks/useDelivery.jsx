import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { route } from '@/routes';
import useAxios from '@/utils/useAxios';
import swalUnauthAlert from '@/components/swalUnauthAlert';


export function useDelivery(delivery_no = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    useEffect(() => {
        if (delivery_no !== null) {
            const controller = new AbortController();
            getDelivery(delivery_no, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [delivery_no]);

    async function createDelivery(delivery) {
        setLoading(true);
        setErrors({});

        console.log(delivery)
        return axiosInstance.post('deliveries/', delivery)
            .then(() => navigate(route('dashboard.deliveries.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function getDelivery(delivery_no, { signal } = {}) {
        setLoading(true);

        return axios.get(`http://127.0.0.1:8000/api/deliveries/${delivery_no}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function updateDelivery(delivery) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`deliveries/${delivery.delivery_no}/`, delivery)
            .then(() => navigate(route('dashboard.deliveries.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function destroyDelivery(delivery) {
        return axiosInstance.delete(`deliveries/${delivery.delivery_no}/`)
            .then(() => navigate(route('dashboard.deliveries.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    return {
        delivery: { data, setData, errors, loading }, 
        getDelivery, 
        createDelivery, 
        updateDelivery, 
        destroyDelivery
    }
}