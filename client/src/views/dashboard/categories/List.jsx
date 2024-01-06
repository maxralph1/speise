import { useContext } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { route } from '@/routes';
import { useCategories } from '@/hooks/useCategories.jsx';
import { useCategory } from '@/hooks/useCategory.jsx';
import AuthContext from '@/context/AuthContext.jsx';
import Layout from '@/components/dashboard/Layout.jsx';


export default function List() {
    const { categories, getCategories } = useCategories();
    const { destroyCategory } = useCategory();
    const { user } = useContext(AuthContext);

    return (
        <Layout>

        </Layout>
    )
}
