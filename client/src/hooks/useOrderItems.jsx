import { useState, useEffect } from 'react';
import axios from 'axios';


export function useOrderItems() {
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getOrderItems({ signal: controller.signal });
        return () => { controller.abort() }
    }, []);

    async function getOrderItems({ signal } = {}) {
        return axios.get('http://127.0.0.1:8000/api/order-items/', { signal })
            .then(response => setOrderItems(response.data))
            .catch(() => {});
    }

    return { orderItems, getOrderItems }
}