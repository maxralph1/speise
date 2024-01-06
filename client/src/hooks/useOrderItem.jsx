import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { route } from '@/routes';
import useAxios from '@/utils/useAxios';
import swalUnauthAlert from '@/components/swalUnauthAlert';


export function useOrderItem(order_item_no = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    useEffect(() => {
        if (order_item_no !== null) {
            const controller = new AbortController();
            getOrder(order_item_no, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [order_item_no]);

    async function createOrderItem(order_item) {
        setLoading(true);
        setErrors({});

        console.log(order)
        return axiosInstance.post('order-items/', order_item)
            .then(() => navigate(route('dashboard.order-items.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function getOrder(order_item_no, { signal } = {}) {
        setLoading(true);

        return axios.get(`http://127.0.0.1:8000/api/order-items/${order_item_no}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function updateOrder(order_item) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`order-items/${order_item.order_item_no}/`, order_item)
            .then(() => navigate(route('dashboard.order-items.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function destroyOrder(order_item) {
        return axiosInstance.delete(`order-items/${order_item.order_item_no}/`)
            .then(() => navigate(route('dashboard.order-items.index')))
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