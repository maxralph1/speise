import { useState, useEffect } from 'react';
import axios from 'axios';


export function useDeliveries() {
    const [deliveries, setDeliveries] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getDeliveries({ signal: controller.signal });
        return () => { controller.abort() }
    }, []);

    async function getDeliveries({ signal } = {}) {
        return axios.get('http://127.0.0.1:8000/api/deliveries/', { signal })
            .then(response => setDeliveries(response.data))
            .catch(() => {});
    }

    return { deliveries, getDeliveries }
}