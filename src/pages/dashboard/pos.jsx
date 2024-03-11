import { Helmet } from 'react-helmet-async';

import PosView from 'src/sections/pos/view';

// ----------------------------------------------------------------------

export default function PosPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: POS</title>
      </Helmet>
      <PosView />
    </>
  );
}
