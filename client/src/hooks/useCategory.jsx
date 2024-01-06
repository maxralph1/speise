import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { route } from '@/routes';
import useAxios from '@/utils/useAxios';
import swalUnauthAlert from '@/components/swalUnauthAlert';


export function useCategory(slug = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    useEffect(() => {
        if (slug !== null) {
            const controller = new AbortController();
            getCategory(slug, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [slug]);

    async function createCategory(category) {
        setLoading(true);
        setErrors({});

        console.log(category)
        return axiosInstance.post('menu/categories/', category)
            .then(() => navigate(route('dashboard.categories.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function getCategory(slug, { signal } = {}) {
        setLoading(true);

        return axios.get(`http://127.0.0.1:8000/api/menu/categories/${slug}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function updateCategory(category) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`menu/categories/${category.slug}/`, category)
            .then(() => navigate(route('dashboard.categories.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function destroyCategory(category) {
        return axiosInstance.delete(`menu/categories/${category.slug}/`)
            .then(() => navigate(route('dashboard.categories.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    return {
        category: { data, setData, errors, loading }, 
        getCategory, 
        createCategory, 
        updateCategory, 
        destroyCategory
    }
}