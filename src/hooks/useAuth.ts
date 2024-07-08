import { AccountStatus, Gender, Role } from '../utils/enums';
import { useCallback, useEffect, useState } from 'react';

import cookieUtils from '../utils/cookieUtils';
import { getInfoCurrentUser } from '../utils/accountAPI';

type JwtType = {
    exp: number;
    id: number;
    role: string;
    fullname: string;
    email: string;
    status: string;
};

export type UserType = {
    avatarUrl: string;
    email: string;
    fullName: string;
    phoneNumber: string | null;
    id: number;
    dateOfBirth: Date | string | null;
    gender: Gender | string;
    status: string;
    role: string;
    address: string | null;
    createAt: Date | string |null;
};

// Function to get the role from the decoded JWT
const getRole = () => {
    const decoded = cookieUtils.decodeJwt() as JwtType;

    if (!decoded || !decoded.role) return null;

    return Role[decoded.role];
};
const getStatus = () => {
    const decoded = cookieUtils.decodeJwt() as JwtType;

    if (!decoded || !decoded.status) return null;

    return AccountStatus[decoded.status];
};

const useAuth = () => {
    const [role, setRole] = useState<string | null>(getRole());
    const [status, setStatus] = useState<string | null>(getStatus());
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<UserType>();

    const token = cookieUtils.getToken();

    // Function to check token expiration
    const checkTokenExpiration = useCallback(() => {
        if (token) {
            const decoded = cookieUtils.decodeJwt() as JwtType;

            // Check if the token is expired
            if (!decoded || decoded.exp < Date.now() / 1000) {
                setRole(null);
                setStatus(null);
                cookieUtils.deleteUser();
                return;
            }
        }
    }, [token]);

    useEffect(() => {
        const token = cookieUtils.getToken();

        // If there is no token, set the role to null
        if (!token) {
            setRole(null);
            setStatus(null);
            return;
        }

        try {
            setLoading(true);

            // Set role
            setRole(getRole());
            setStatus(getStatus());

            // Fetch API to get info user
            const getInfo = async () => {
                const { data } = await getInfoCurrentUser();
                setUser(data);
            };

            getInfo();
        } finally {
            setLoading(false);
        }

        // Set up an interval to check token expiration every 5 seconds
        const intervalId = setInterval(checkTokenExpiration, 5000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [checkTokenExpiration]);

    return { loading, role, user, status };
};

export default useAuth;
