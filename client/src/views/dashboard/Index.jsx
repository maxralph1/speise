import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { route } from '@/routes';
import { useCategories } from '../../hooks/useCategories';
import { useMeals } from '../../hooks/useMeals';
import AuthContext from '@/context/AuthContext.jsx';
import Layout from '@/components/dashboard/Layout.jsx';
import '@/assets/css/main.css';
import '@/assets/css/dashboard.css';


export default function Index() {
    const { categories, getCategories } = useCategories();
    const { meals, getMeals } = useMeals();
    
    return (
        <Layout>
            <section className="orders mt-5">
                <h2 className="fs-4 fw-semibold">Recently Placed Orders</h2>
                <div className="table-responsive small">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Order Placed By</th>
                                <th scope="col">To Be Delivered?</th>
                                <th scope="col">Delivery By</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1,001</td>
                                <td>John Doe</td>
                                <td>Yes</td>
                                <td>John Snow</td>
                                <td><a href="#" className="badge text-bg-secondary text-decoration-none details">Details</a></td>
                            </tr>
                            <tr>
                                <td>1,001</td>
                                <td>John Doe</td>
                                <td>No</td>
                                <td>--</td>
                                <td><a href="#" className="badge text-bg-secondary text-decoration-none details">Details</a></td>
                            </tr>
                            <tr>
                                <td>1,001</td>
                                <td>John Doe</td>
                                <td>Yes</td>
                                <td>John Snow</td>
                                <td><a href="#" className="badge text-bg-secondary text-decoration-none details">Details</a></td>
                            </tr>
                            <tr>
                                <td>1,001</td>
                                <td>John Doe</td>
                                <td>No</td>
                                <td>--</td>
                                <td><a href="#" className="badge text-bg-secondary text-decoration-none details">Details</a></td>
                            </tr>
                            <tr>
                                <td>1,001</td>
                                <td>John Doe</td>
                                <td>Yes</td>
                                <td>John Snow</td>
                                <td><a href="#" className="badge text-bg-secondary text-decoration-none details">Details</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* <!-- if length is greater tha the displayed 5, show the 'See more ...' link --> */}
                <span><a href="#" className="text-decoration-none see-more">See more ...
                    &nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                            d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                    </svg>
                </a></span>
            </section>

            <section className="meals mt-5">
                <h2 className="fs-4 fw-semibold">Recently added Available Meals</h2>
                <div className="table-responsive small">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Meal</th>
                                <th scope="col">Price</th>
                                <th scope="col">Discount</th>
                                <th scope="col">In-stock</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            { (meals.length > 0 && !loadingMeals) ? meals.slice(0,5).map(meal => {
                            return (
                                    <tr key={ meal.slug }>
                                        <td>{ meal.id }</td>
                                        <td>{ meal.name.substring(0, 25) }</td>
                                        <td>{ meal.price }</td>
                                        <td>
                                            <Link 
                                                to={route('dashboard.meals.show', { slug: meal.slug })} 
                                                href="#" 
                                                className="badge text-bg-secondary text-decoration-none details">
                                                    Details
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            }) : (
                                <tr className='span-3'>
                                    <td className="d-flex justify-content-center my-5">
                                        <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            <tr>
                                <td>1,001</td>
                                <td>Pasta</td>
                                <td>20.59 EUR</td>
                                <td>20%</td>
                                <td className="text-warning">2</td>
                                <td><a href="#" className="badge text-bg-secondary text-decoration-none details">Details</a></td>
                            </tr>
                            <tr>
                                <td>1,002</td>
                                <td>Chicken Sauce</td>
                                <td>25.99 EUR</td>
                                <td>0.59 EUR</td>
                                <td className="text-success">10</td>
                                <td><a href="#" className="badge text-bg-secondary text-decoration-none details">Details</a></td>
                            </tr>
                            <tr>
                                <td>1,003</td>
                                <td>Hot Sauce</td>
                                <td>10.99 EUR</td>
                                <td>--</td>
                                <td className="text-success">52</td>
                                <td><a href="#" className="badge text-bg-secondary text-decoration-none details">Details</a></td>
                            </tr>
                            <tr>
                                <td>1,003</td>
                                <td>Pineapple Treat</td>
                                <td>5.99 EUR</td>
                                <td>--</td>
                                <td className="text-warning">5</td>
                                <td><a href="#" className="badge text-bg-secondary text-decoration-none details">Details</a></td>
                            </tr>
                            <tr>
                                <td>1,004</td>
                                <td>Rice and Fish Combo</td>
                                <td>34.99 EUR</td>
                                <td>35%</td>
                                <td className="text-success">40</td>
                                <td><a href="#" className="badge text-bg-secondary text-decoration-none details">Details</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                { (meals.length > 5 ) &&
                <span><a href="#" className="text-decoration-none see-more">See more ...
                    &nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-short"
                        viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                            d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                    </svg>
                </a></span> }
            </section>

            <section className="categories mt-5">
                <h2 className="fs-4 fw-semibold">Recently added Categories</h2>
                <div className="table-responsive small">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(categories.length > 0) ? categories.slice(0,5).map(category => {
                            return (
                                    <tr key={ category.slug }>
                                        <td>{ category.id }</td>
                                        <td>{ category.title.substring(0, 25) }</td>
                                        <td>{ category.description.substring(0, 50) }</td>
                                        <td>
                                            <Link 
                                                to={route('dashboard.categories.show', { slug: category.slug })} 
                                                href="#" 
                                                className="badge text-bg-secondary text-decoration-none details">
                                                    Details
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            }) : (
                                <tr>
                                    <td className="d-flex justify-content-center my-5">
                                        <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                { (categories.length > 5 ) && 
                <span><Link 
                    to={route('dashboard.categories.index')} 
                    className="text-decoration-none see-more"
                >See more ...
                    &nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                            d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                    </svg>
                </Link></span> }
            </section>

            <section className="customers mt-5">
                <h2 className="fs-4 fw-semibold">Recently Registered Customers</h2>
                <div className="table-responsive small">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Delivery Address</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1,001</td>
                                <td>John Doe</td>
                                <td>user@user.com</td>
                                <td>#123 Essen Str., Deutschland</td>
                                <td><a href="#" className="badge text-bg-secondary text-decoration-none details">Details</a></td>
                            </tr>
                            <tr>
                                <td>1,002</td>
                                <td>John Doe</td>
                                <td>user@user.com</td>
                                <td>#123 Essen Str., Deutschland</td>
                                <td><a href="#" className="badge text-bg-secondary text-decoration-none details">Details</a></td>
                            </tr>
                            <tr>
                                <td>1,003</td>
                                <td>John Doe</td>
                                <td>user@user.com</td>
                                <td>#123 Essen Str., Deutschland</td>
                                <td><a href="#" className="badge text-bg-secondary text-decoration-none details">Details</a></td>
                            </tr>
                            <tr>
                                <td>1,003</td>
                                <td>John Doe</td>
                                <td>user@user.com</td>
                                <td>#123 Essen Str., Deutschland</td>
                                <td><a href="#" className="badge text-bg-secondary text-decoration-none details">Details</a></td>
                            </tr>
                            <tr>
                                <td>1,004</td>
                                <td>John Doe</td>
                                <td>user@user.com</td>
                                <td>#123 Essen Str., Deutschland</td>
                                <td><a href="#" className="badge text-bg-secondary text-decoration-none details">Details</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <span><a href="#" className="text-decoration-none see-more">See more ...
                    &nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                            d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                    </svg>
                </a></span>
            </section>

            <section className="discounts mt-5">
                <h2 className="fs-4 fw-semibold">Recently added Discounts</h2>
                <div className="table-responsive small">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Discount Title</th>
                                <th scope="col">Value</th>
                                <th scope="col">Availability</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>X-MASPROMO</td>
                                <td>Christmas Coupon</td>
                                <td>20.59 EUR</td>
                                <td className="text-success">Available</td>
                                <td><a href="#" className="badge text-bg-secondary text-decoration-none details">Details</a></td>
                            </tr>
                            <tr>
                                <td>BLACKFRIDAY</td>
                                <td>Black Friday Coupon</td>
                                <td>20.59 EUR</td>
                                <td className="text-danger">Expired</td>
                                <td><a href="#" className="badge text-bg-secondary text-decoration-none details">Details</a></td>
                            </tr>
                            <tr>
                                <td>EASTER</td>
                                <td>Easter Coupon</td>
                                <td>20%</td>
                                <td className="text-warning">Expiring Soon</td>
                                <td><a href="#" className="badge text-bg-secondary text-decoration-none details">Details</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <span><a href="#" className="text-decoration-none see-more">See more ...
                    &nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                            d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                    </svg>
                </a></span>
            </section>

            <section className="staff mt-5">
                <h2 className="fs-4 fw-semibold">Recently Registered Customers</h2>
                <div className="table-responsive small">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1,001</td>
                                <td>John Doe</td>
                                <td>user@user.com</td>
                                <td>Admin</td>
                                <td><a href="#" className="badge text-bg-secondary text-decoration-none details">Details</a></td>
                            </tr>
                            <tr>
                                <td>1,002</td>
                                <td>John Doe</td>
                                <td>user@user.com</td>
                                <td>Chef</td>
                                <td><a href="#" className="badge text-bg-secondary text-decoration-none details">Details</a></td>
                            </tr>
                            <tr>
                                <td>1,003</td>
                                <td>John Doe</td>
                                <td>user@user.com</td>
                                <td>Driver</td>
                                <td><a href="#" className="badge text-bg-secondary text-decoration-none details">Details</a></td>
                            </tr>
                            <tr>
                                <td>1,003</td>
                                <td>John Doe</td>
                                <td>user@user.com</td>
                                <td>Manager</td>
                                <td><a href="#" className="badge text-bg-secondary text-decoration-none details">Details</a></td>
                            </tr>
                            <tr>
                                <td>1,004</td>
                                <td>John Doe</td>
                                <td>user@user.com</td>
                                <td>Superadmin</td>
                                <td><a href="#" className="badge text-bg-secondary text-decoration-none details">Details</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <span><a href="#" className="text-decoration-none see-more">See more ...
                        &nbsp;
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                        </svg>
                    </a></span>
            </section>
        </Layout>
    )
}
