import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { route } from '@/routes';
import useAxios from '@/utils/useAxios';
import swalUnauthAlert from '@/components/swalUnauthAlert';


export function useMealInventory(slug = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    useEffect(() => {
        if (slug !== null) {
            const controller = new AbortController();
            getMealInventory(slug, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [slug]);

    async function createMealInventory(meal_inventory) {
        setLoading(true);
        setErrors({});

        console.log(meal_inventory)
        return axiosInstance.post('menu/meal-inventories/', meal_inventory)
            .then(() => navigate(route('dashboard.meal-inventories.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function getMealInventory(slug, { signal } = {}) {
        setLoading(true);

        return axios.get(`http://127.0.0.1:8000/api/menu/meal-inventories/${slug}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function updateMealInventory(meal_inventory) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`menu/meal-inventories/${meal_inventory.slug}/`, meal_inventory)
            .then(() => navigate(route('dashboard.meal-inventories.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function destroyMealInventory(meal_inventory) {
        return axiosInstance.delete(`menu/meal-inventories/${meal_inventory.slug}/`)
            .then(() => navigate(route('dashboard.meal-inventories.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    return {
        mealInventory: { data, setData, errors, loading }, 
        getMealInventory, 
        createMealInventory, 
        updateMealInventory, 
        destroyMealInventory
    }
}