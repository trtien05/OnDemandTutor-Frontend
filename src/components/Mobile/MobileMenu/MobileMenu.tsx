import { Menu as AntMenu, Flex, MenuProps } from 'antd';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';

import { DrawerStyled } from './MobileMenu.styled';

const MobileMenu = ({
    title,
    size,
    menu,
}: {
    title?: JSX.Element;
    size?: number;
    menu: MenuProps['items'];
}) => {
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleCloseMenu = () => {
        setOpen(false);
    };

    return (
        <>
            <AiOutlineMenu onClick={showDrawer} size={size || 30} cursor="pointer" />
            <DrawerStyled
                title={
                    (
                        <Flex justify="center" onClick={handleCloseMenu}>
                            {title}
                        </Flex>
                    ) || 'MyTutor'
                }
                placement="right"
                onClose={onClose}
                open={open}
            >
                <AntMenu
                    selectedKeys={[location.pathname]}
                    items={menu}
                    onClick={handleCloseMenu}
                    mode="inline"
                    inlineIndent={0}
                />
            </DrawerStyled>
        </>
    );
};

export default MobileMenu;
