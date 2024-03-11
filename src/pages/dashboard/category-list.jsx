import { Helmet } from 'react-helmet-async';

import ProductListView from 'src/sections/product-list/view';

// ----------------------------------------------------------------------

export default function CategoryListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Category List</title>
      </Helmet>

      <ProductListView />
    </>
  );
}
