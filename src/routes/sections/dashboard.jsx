import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// OVERVIEW
const OverviewAnalyticsPage = lazy(() => import('src/pages/dashboard/analytics'));

// BLANK PAGE
const CategoryListPage = lazy(() => import('src/pages/dashboard/category-list'));
const ProductListPage = lazy(() => import('src/pages/dashboard/product-list'));
const PosPage = lazy(() => import('src/pages/dashboard/pos'));
const SalesPage = lazy(() => import('src/pages/dashboard/sales'));
export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <OverviewAnalyticsPage />, index: true },
      { path: 'category-list', element: <CategoryListPage /> },
      { path: 'product-list', element: <ProductListPage /> },
      { path: 'pos', element: <PosPage /> },
      { path: 'sales', element: <SalesPage /> },
    ],
  },
];
