import { useState, useEffect } from 'react';
import axios from 'axios';


export function useMeals() {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getMeals({ signal: controller.signal });
        return () => { controller.abort() }
    }, []);

    async function getMeals({ signal } = {}) {
        return axios.get('http://127.0.0.1:8000/api/menu/meals/', { signal })
            .then(response => setMeals(response.data))
            .catch(() => {});
    }

    return { meals, getMeals }
}