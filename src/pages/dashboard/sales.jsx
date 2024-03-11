import { Helmet } from 'react-helmet-async';

import SalesView from 'src/sections/sales/view';

// ----------------------------------------------------------------------

export default function SalesPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Sales</title>
      </Helmet>
      <SalesView />
    </>
  );
}
