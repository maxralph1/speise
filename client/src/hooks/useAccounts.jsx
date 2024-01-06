import { useState, useEffect } from 'react';
import axios from 'axios';


export function useAccounts() {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getAccounts({ signal: controller.signal });
        return () => { controller.abort() }
    }, []);

    async function getAccounts({ signal } = {}) {
        return axios.get('http://127.0.0.1:8000/api/accounts/', { signal })
            .then(response => {
                console.log(response.data)
                setAccounts(response.data)
    })
            .catch(() => {});
    }

    return { accounts, getAccounts }
}