import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import cookieUtils from '../utils/cookieUtils';

type JwtType = {
    exp: number;
};

const checkTokenInURL = () => {
    const { search } = useLocation();
    const token = cookieUtils.getToken();

    // Check if token exists in URL
    useEffect(() => {
        // Parse search params
        const params = new URLSearchParams(search);

        // Check if success param is true
        if (params.get('success') === 'true') {
            cookieUtils.setToken(params.get('accessToken') || '');
        }

        // Decode token from cookie
        const decodedToken = cookieUtils.decodeJwt() as JwtType;

        if (token && decodedToken && decodedToken.exp < Date.now() / 1000) {
            // Delete user cookie
            cookieUtils.deleteUser();
        }
    }, [search, token]);
};

export default checkTokenInURL;
