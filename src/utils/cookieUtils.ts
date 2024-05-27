import Cookies from 'universal-cookie';
import config from '../config';
import {jwtDecode} from 'jwt-decode';

const cookies = new Cookies(null, { path: '/' });

class CookieUtils {
    getItem(key: string, defaultValue = '') {
        const item = cookies.get(key);
        return item !== undefined ? item : defaultValue;
    }

    setItem(key: string, value = '') {
        cookies.set(key, value, { path: '/' });
    }

    removeItem(key: string) {
        cookies.remove(key);
    }

    decodeJwt() {
        const token = this.getItem(config.cookies.token);
        if (token) {
            try {
                const jwtUser = jwtDecode(token);
                return jwtUser;
            } catch (err) {
                this.deleteUser();
            }
        }
        return undefined;
    }

    deleteUser() {
        cookies.remove(config.cookies.token);
    }

    getToken() {
        return this.getItem(config.cookies.token);
    }

    setToken(value = '') {
        this.setItem(config.cookies.token, value);
    }

    clear() {
        cookies.remove(config.cookies.token, { path: '/' });
    }
}

export default new CookieUtils();