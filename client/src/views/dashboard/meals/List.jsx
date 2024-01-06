import { useContext } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { route } from '@/routes';
import { useMeals } from '@/hooks/useMeals.jsx';
import { useMeal } from '@/hooks/useMeal.jsx';
import AuthContext from '@/context/AuthContext.jsx';
import Layout from '@/components/dashboard/Layout.jsx';


export default function List() {
    const { meals, getMeals } = useMeals();
    const { destroyMeal } = useMeal();
    const { user } = useContext(AuthContext);

    return (
        <Layout>

        </Layout>
    )
}
