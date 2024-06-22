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
    accountStatus: AccountStatus;
};

export type UserType = {
    avatarUrl: string;
    email: string;
    fullName: string;
    phoneNumber: string | null;
    id: number;
    createdAt: Date | string;
    dateOfBirth: Date | string | null;
    gender: Gender;
    status: string;
    role: string;
};

// Function to get the role from the decoded JWT
const getRole = () => {
    const decoded = cookieUtils.decodeJwt() as JwtType;

    if (!decoded || !decoded.role) return null;

    return Role[decoded.role];
};

const useAuth = () => {
    const [role, setRole] = useState<string | null>(getRole());
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
            return;
        }

        try {
            setLoading(true);

            // Set role
            setRole(getRole());

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

    return { loading, role, user };
};

export default useAuth;
