import { useState, useEffect } from 'react';
import axios from 'axios';


export function useOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getOrders({ signal: controller.signal });
        return () => { controller.abort() }
    }, []);

    async function getOrders({ signal } = {}) {
        return axios.get('http://127.0.0.1:8000/api/orders/', { signal })
            .then(response => setOrders(response.data))
            .catch(() => {});
    }

    return { orders, getOrders }
}