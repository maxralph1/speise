import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { route } from '@/routes';
import useAxios from '@/utils/useAxios';
import swalUnauthAlert from '@/components/swalUnauthAlert';


export function useOrder(order_no = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    useEffect(() => {
        if (order_no !== null) {
            const controller = new AbortController();
            getOrder(order_no, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [order_no]);

    async function createOrder(order) {
        setLoading(true);
        setErrors({});

        console.log(order)
        return axiosInstance.post('orders/', order)
            .then(() => navigate(route('dashboard.orders.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function getOrder(order_no, { signal } = {}) {
        setLoading(true);

        return axios.get(`http://127.0.0.1:8000/api/orders/${order_no}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function updateOrder(order) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`orders/${order.order_no}/`, order)
            .then(() => navigate(route('dashboard.orders.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function destroyOrder(order) {
        return axiosInstance.delete(`orders/${order.order_no}/`)
            .then(() => navigate(route('dashboard.orders.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    return {
        order: { data, setData, errors, loading }, 
        getOrder, 
        createOrder, 
        updateOrder, 
        destroyOrder
    }
}