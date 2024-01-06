import { useContext } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { route } from '@/routes';
import { useDeliveries } from '@/hooks/useDeliveries.jsx';
import { useDelivery } from '@/hooks/useDelivery.jsx';
import AuthContext from '@/context/AuthContext.jsx';
import Layout from '@/components/dashboard/Layout.jsx';


export default function List() {
    const { deliveries, getDeliveries } = useDeliveries();
    const { destroyDelivery } = useDelivery();
    const { user } = useContext(AuthContext);

    return (
        <Layout>

        </Layout>
    )
}
