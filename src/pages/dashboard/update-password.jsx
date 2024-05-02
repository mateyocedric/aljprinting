import { Helmet } from 'react-helmet-async';

import UpdatePasswordView from 'src/sections/update-password/view';

// ----------------------------------------------------------------------

export default function UpdatePassword() {
    return (
        <>
            <Helmet>
                <title> Dashboard: Update Password</title>
            </Helmet>
            <UpdatePasswordView />
        </>
    );
}
