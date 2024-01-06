import { useCategories } from '../../hooks/useCategories';
import { useMeals } from '../../hooks/useMeals';
import { useOrders } from '../../hooks/useOrders';
import { useAccounts } from '../../hooks/useAccounts';


export default function Meters() {
    const { categories } = useCategories();
    const { meals } = useMeals();
    const { orders } = useOrders();
    const { accounts } = useAccounts();

    console.log(accounts)
    // console.log(accounts.customers_count)

    return (
        <section className="row mb-4">
            <div className="col-sm-6 col-md-3 mb-3">
                <div className="card rounded-0 shadow">
                    <div className="card-body">
                        <h3 className="card-title fs-6">Total Orders</h3>
                        <p className="card-text fw-semibold">{ orders.length }</p>
                        {/* <p className='card-text'>200 from this week</p> */}
                    </div>
                </div>
            </div>
            <div className="col-sm-6 col-md-3 mb-3">
                <div className="card rounded-0 shadow">
                    <div className="card-body">
                        <h3 className="card-title fs-6">Total Meals Available</h3>
                        <p className="card-text fw-semibold">{ meals.length }</p>
                        {/* <p className='card-text'>200 from this week</p> */}
                    </div>
                </div>
            </div>
            <div className="col-sm-6 col-md-3 mb-3">
                <div className="card rounded-0 shadow">
                    <div className="card-body">
                        <h3 className="card-title fs-6">Total Categories</h3>
                        <p className="card-text fw-semibold">{ categories.length }</p>
                        {/* <p className='card-text'>200 from this week</p> */}
                    </div>
                </div>
            </div>
            <div className="col-sm-6 col-md-3">
                <div className="card rounded-0 shadow">
                    <div className="card-body">
                        <h3 className="card-title fs-6">Total Customers</h3>
                        <p className="card-text fw-semibold">{ accounts.filter(account => account.role == 'CST').length }</p>
                        {/* <p className="card-text fw-semibold">{ accounts.customers_count }</p> */}
                        {/* <p className='card-text'>200 from this week</p> */}
                    </div>
                </div>
            </div>
        </section>
    )
}
