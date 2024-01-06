import { useState, useEffect } from 'react';
import axios from 'axios';


export function useMealInventories() {
    const [mealInventories, setMealInventories] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getMealInventories({ signal: controller.signal });
        return () => { controller.abort() }
    }, []);

    async function getMealInventories({ signal } = {}) {
        return axios.get('http://127.0.0.1:8000/api/menu/meal-inventories/', { signal })
            .then(response => setMealInventories(response.data))
            .catch(() => {});
    }

    return { mealInventories, getMealInventories }
}