import { useContext } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { route } from '@/routes';
import { useOrders } from '@/hooks/useOrders.jsx';
import { useOrder } from '@/hooks/useOrder.jsx';
import AuthContext from '@/context/AuthContext.jsx';
import Layout from '@/components/dashboard/Layout.jsx';


export default function List() {
    const { orders, getOrders } = useOrders();
    const { destroyOrder } = useOrder();
    const { user } = useContext(AuthContext);

    return (
        <Layout>

        </Layout>
    )
}
