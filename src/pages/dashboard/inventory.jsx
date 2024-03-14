import { Helmet } from 'react-helmet-async';

import InventoryView from 'src/sections/pos/view';

// ----------------------------------------------------------------------

export default function InventoryPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: POS</title>
      </Helmet>
      <InventoryView />
    </>
  );
}