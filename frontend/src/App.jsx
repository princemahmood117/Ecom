import { Routes, Route } from 'react-router-dom';
import AdminRoute from './components/shared/AdminRoute';
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './components/pages/admin/AdminDashboard';
import AllProducts from './components/pages/admin/AllProducts';
import AddProduct from './components/pages/admin/AddProduct';
import AdminOrders from './components/pages/admin/AdminOrders';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Cosmetics from './components/pages/Cosmetics';
import ProductDetails from './components/pages/ProductDetails';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import PrivateRoute from './components/shared/PrivateRoute';
import Cart from './components/pages/Cart';
import MyOrders from './components/pages/MyOrders';


function App() {
  return (
    <>
      <Routes>
        <Route path="/admin/*" element={
          <AdminRoute>
            <AdminLayout>
              <Routes>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AllProducts />} />
                <Route path="add-product" element={<AddProduct />} />
                <Route path="orders" element={<AdminOrders />} />
              </Routes>
            </AdminLayout>
          </AdminRoute>
        } />

        <Route path="*" element={
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cosmetics" element={<Cosmetics />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
              <Route path="/dashboard" element={<PrivateRoute><MyOrders /></PrivateRoute>} />
            </Routes>
          </>
        } />
      </Routes>
    </>
  );
}

export default App;