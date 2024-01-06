import { useState, useEffect } from 'react';
import axios from 'axios';


export function useCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        getCategories({ signal: controller.signal });
        return () => { controller.abort() }
    }, []);

    async function getCategories({ signal } = {}) {
        return axios.get('http://127.0.0.1:8000/api/menu/categories/', { signal })
            .then(response => setCategories(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    return { categories, getCategories, loading }
}