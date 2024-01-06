import { useContext } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { route } from '@/routes';
import { useAccounts } from '@/hooks/useAccounts.jsx';
import { useAccount } from '@/hooks/useAccount.jsx';
import AuthContext from '@/context/AuthContext.jsx';
import Layout from '@/components/dashboard/Layout.jsx';


export default function List() {
    const { accounts, getAccounts } = useAccounts();
    const { destroyAccount } = useAccount();
    const { user } = useContext(AuthContext);

    return (
        <Layout>

        </Layout>
    )
}
