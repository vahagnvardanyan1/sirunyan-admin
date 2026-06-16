import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import SignIn from './pages/Authentication/SignIn';
import ECommerce from './pages/Dashboard/ECommerce';
import DefaultLayout from './layout/DefaultLayout';
import Portfolio from './pages/Dashboard/Portfolio';
import Blog from './pages/Dashboard/Blog';
import AboutUs from './pages/Dashboard/AboutUs';
import AboutUsTable from './components/Tables/TableOne';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ProtectedRoute from './pages/Authentication/PrivateRoute.tsx';
import Settings from './pages/Settings.tsx';
import PortfolioList from './components/Tables/TableThree.tsx';
import BlogList from './components/Tables/TableTwo.tsx';
import BlogDetail from './pages/Dashboard/BlogDetail.tsx';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);


  return loading ? (
    <Loader />
  ) : (
    <Provider store={store}>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/auth/signin"
          element={
            <DefaultLayout>
              <SignIn />
            </DefaultLayout>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <ECommerce />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <Settings />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/portfolio"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <Portfolio />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/portfolio-list"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <PortfolioList />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <Blog />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <BlogDetail  />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog-list"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <BlogList />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/about-us"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <AboutUs />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/about-us-list"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <AboutUsTable />
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Provider>
  );
};

export default App;
