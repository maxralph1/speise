import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { route } from '@/routes';
import useAxios from '@/utils/useAxios';
import swalUnauthAlert from '@/components/swalUnauthAlert';


export function useMeal(slug = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    useEffect(() => {
        if (slug !== null) {
            const controller = new AbortController();
            getMeal(slug, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [slug]);

    async function createMeal(meal) {
        setLoading(true);
        setErrors({});

        console.log(meal)
        return axiosInstance.post('menu/meals/', meal)
            .then(() => navigate(route('dashboard.meals.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function getMeal(slug, { signal } = {}) {
        setLoading(true);

        return axios.get(`http://127.0.0.1:8000/api/menu/meals/${slug}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function updateMeal(meal) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`menu/meals/${meal.slug}/`, meal)
            .then(() => navigate(route('dashboard.meals.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function destroyMeal(meal) {
        return axiosInstance.delete(`menu/meals/${meal.slug}/`)
            .then(() => navigate(route('dashboard.meals.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    return {
        meal: { data, setData, errors, loading }, 
        getMeal, 
        createMeal, 
        updateMeal, 
        destroyMeal
    }
}