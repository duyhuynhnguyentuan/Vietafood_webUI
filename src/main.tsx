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

inject();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App isshowBackground={false} content={<Homepage/>} />,
  },
  {
    path: "/aboutUs",
    element: <App isshowBackground={true} content={<AboutUs/>} />,
  },
  {
    path: "/products",
    element: <App isshowBackground={true} content={<ProductsPage/>} />
  },
],);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    <GlobalStyles/>
  </React.StrictMode>,
)
