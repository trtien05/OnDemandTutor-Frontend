import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { PIIProps } from '../../layouts/MainLayout/Header/Header.type';
import Header from '../../layouts/MainLayout/Header';
import { menuLogged, menuUnLogged, navbar } from '../../layouts/MainLayout/Header/Header.customer';
import Footer from '../../layouts/MainLayout/Footer';

const HomeLayout = () => {
    const { role, user } = useAuth();
    const menu = role ? menuLogged(user as PIIProps) : menuUnLogged();

    return (
        <>
            <Header
                role={role}
                navbar={navbar}
                menu={menu}
                avatar={user?.avatar}
            />

            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    );
};

export default HomeLayout;
