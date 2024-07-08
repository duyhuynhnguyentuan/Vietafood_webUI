import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App.tsx';
import './index.css';
import GlobalStyles from './styles/GlobalStyle.tsx';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { store } from './app/components/State/Store.tsx';
import { Homepage } from './app/containers/Homepage/index.tsx';
import { AboutUs } from './app/containers/Aboutpage/index.tsx';
import { ProductsPage } from './app/containers/ProductsPage/index.tsx';
import NotFoundPage from './app/components/error/index.tsx';
import ProductDetail from './app/containers/ProductDetail/index.tsx';
import CheckOutPage from './app/containers/CheckOutpage/index.tsx';
import OrderDetail from './app/containers/OrderDetailPage/index.tsx';
import Login from './app/containers/Admin/loginPage/index.tsx';
import Dashboard from './app/containers/Admin/dashBoard/index.tsx';
import AdminOrderDetails from './app/containers/Admin/orders/index.tsx';
import AdminProductDetails from './app/containers/Admin/products/index.tsx';
import AdminCouponDetails from './app/containers/Admin/coupon/index.tsx';
// import ComingSoon from './app/containers/ComingSoonPage/index.tsx';

injectSpeedInsights();
inject();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          {/* <Route path="/" element={<ComingSoon/>}/> */}
          <Route path="/" element={<App isshowBackground={false} content={<Homepage />} />} />
          <Route path="/aboutUs" element={<App isshowBackground={true} content={<AboutUs />} />} />
          <Route path="/products" element={<App isshowBackground={true} content={<ProductsPage />} />} />
          <Route path="/product/:id" element={<App isshowBackground={false} content={<ProductDetail />} />} />
          <Route path="/checkout" element={<App isshowBackground={true} content={<CheckOutPage />} />} />
          <Route path="/orderDetail/:id" element={<App isshowBackground={true} content={<OrderDetail />} />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />}>
            <Route path="orders" element={<AdminOrderDetails />} />
            <Route path="products" element={<AdminProductDetails />} />
            <Route path="coupons" element={<AdminCouponDetails />} />
          </Route>
          <Route path="*" element={<App isshowBackground={true} content={<NotFoundPage />} />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
