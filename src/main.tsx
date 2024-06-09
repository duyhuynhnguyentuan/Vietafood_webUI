import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import GlobalStyles from './styles/GlobalStyle.tsx'
import { inject } from '@vercel/analytics';
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { Homepage } from './app/containers/Homepage/index.tsx'
import { AboutUs } from './app/containers/Aboutpage/index.tsx'
import { ProductsPage } from './app/containers/ProductsPage/index.tsx'
import { injectSpeedInsights } from '@vercel/speed-insights';
import { Provider } from 'react-redux'
import { store } from './app/components/State/Store.tsx'
import NotFoundPage from './app/components/error/index.tsx'
import ProductDetail from './app/containers/ProductDetail/index.tsx'
import CheckOutPage from './app/containers/CheckOutpage/index.tsx'
injectSpeedInsights();
inject();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App isshowBackground={false} content={<Homepage/>} />,
    errorElement: <App isshowBackground={true} content={<NotFoundPage/>} />
  },
  {
    path: "/aboutUs",
    element: <App isshowBackground={true} content={<AboutUs/>} />,
  },
  {
    path: "/products",
    element: <App isshowBackground={true} content={<ProductsPage/>} />,
  },
  {
    path: "/product/:id",
    element: <App isshowBackground={true} content={<ProductDetail/>} />,
  },
  {
    path:"/checkout",
    element: <App isshowBackground={true} content={<CheckOutPage/>} />,
  }
],);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    <GlobalStyles/>
    </Provider>
  </React.StrictMode>,
)
