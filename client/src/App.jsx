import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { route } from '@/routes';
import PrivateRoute from '@/utils/PrivateRoute.jsx';
import SignUp from '@/views/auth/SignUp.jsx';
import SignIn from '@/views/auth/SignIn.jsx';
import DashboardCategories from '@/views/dashboard/categories/List.jsx';
import DashboardCategoryCreate from '@/views/dashboard/categories/Create.jsx';
import DashboardCategory from '@/views/dashboard/categories/Show.jsx';
import DashboardCategoryEdit from '@/views/dashboard/categories/Edit.jsx';
import DashboardStaffList from '@/views/dashboard/staff/List.jsx';
import DashboardStaffCreate from '@/views/dashboard/staff/Create.jsx';
import DashboardStaff from '@/views/dashboard/staff/Show.jsx';
import DashboardStaffEdit from '@/views/dashboard/staff/Edit.jsx';
import DashboardCustomers from '@/views/dashboard/customers/List.jsx';
import DashboardCustomerCreate from '@/views/dashboard/customers/Create.jsx';
import DashboardCustomer from '@/views/dashboard/customers/Show.jsx';
import DashboardCustomerEdit from '@/views/dashboard/customers/Edit.jsx';
import DashboardMeals from '@/views/dashboard/meals/List.jsx';
import DashboardMealCreate from '@/views/dashboard/meals/Create.jsx';
import DashboardMeal from '@/views/dashboard/meals/Show.jsx';
import DashboardMealEdit from '@/views/dashboard/meals/Edit.jsx';
import DashboardOrders from '@/views/dashboard/orders/List.jsx';
import DashboardOrderCreate from '@/views/dashboard/orders/Create.jsx';
import DashboardOrder from '@/views/dashboard/orders/Show.jsx';
import DashboardOrderEdit from '@/views/dashboard/orders/Edit.jsx';
import DashboardDeliveries from '@/views/dashboard/deliveries/List.jsx';
import DashboardDeliveryCreate from '@/views/dashboard/deliveries/Create.jsx';
import DashboardDelivery from '@/views/dashboard/deliveries/Show.jsx';
import DashboardDeliveryEdit from '@/views/dashboard/deliveries/Edit.jsx';
import DashboardProfile from '@/views/dashboard/Profile.jsx';
import Dashboard from '@/views/dashboard/Index.jsx';


function App() {
  return (
    <BrowserRouter>
     <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route element={<SignIn />} path={ route('sign-in') } />
        <Route element={<SignUp />} path={ route('sign-up') } />

        {/* Protected Routes */}
        <Route element={<PrivateRoute/>} path='/' >
          <Route element={<DashboardCategories/>} path={ route('dashboard.categories.index') } />
          <Route element={<DashboardCategoryCreate/>} path={ route('dashboard.categories.create') } />
          <Route element={<DashboardCategory/>} path={ route('dashboard.categories.show') } />
          <Route element={<DashboardCategoryEdit/>} path={ route('dashboard.categories.edit') } />
          <Route element={<DashboardStaffList/>} path={ route('dashboard.staff.index') } />
          <Route element={<DashboardStaffCreate/>} path={ route('dashboard.staff.create') } />
          <Route element={<DashboardStaff/>} path={ route('dashboard.staff.show') } />
          <Route element={<DashboardStaffEdit/>} path={ route('dashboard.staff.edit') } />
          <Route element={<DashboardCustomers/>} path={ route('dashboard.customers.index') } />
          <Route element={<DashboardCustomerCreate/>} path={ route('dashboard.customers.create') } />
          <Route element={<DashboardCustomer/>} path={ route('dashboard.customers.show') } />
          <Route element={<DashboardCustomerEdit/>} path={ route('dashboard.customers.edit') } />
          <Route element={<DashboardMeals/>} path={ route('dashboard.meals.index') } />
          <Route element={<DashboardMealCreate/>} path={ route('dashboard.meals.create') } />
          <Route element={<DashboardMeal/>} path={ route('dashboard.meals.show') } />
          <Route element={<DashboardMealEdit/>} path={ route('dashboard.meals.edit') } />
          <Route element={<DashboardOrders/>} path={ route('dashboard.orders.index') } />
          <Route element={<DashboardOrderCreate/>} path={ route('dashboard.orders.create') } />
          <Route element={<DashboardOrder/>} path={ route('dashboard.orders.show') } />
          <Route element={<DashboardOrderEdit/>} path={ route('dashboard.orders.edit') } />
          <Route element={<DashboardDeliveries/>} path={ route('dashboard.deliveries.index') } />
          <Route element={<DashboardDeliveryCreate/>} path={ route('dashboard.deliveries.create') } />
          <Route element={<DashboardDelivery/>} path={ route('dashboard.deliveries.show') } />
          <Route element={<DashboardDeliveryEdit/>} path={ route('dashboard.deliveries.edit') } />
          <Route element={<DashboardProfile/>} path={ route('dashboard.profile') } />
          <Route element={<Dashboard/>} path={ route('dashboard') } />
        </Route>
      </Routes>
     </AuthProvider>
    </BrowserRouter>
  )
}

export default App
