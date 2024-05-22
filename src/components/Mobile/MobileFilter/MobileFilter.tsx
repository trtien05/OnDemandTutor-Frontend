import { Drawer } from 'antd';
import { useState } from 'react';

import { theme } from '../../../themes';

import { DrawerIcon, DrawerInner } from './MobileFilter.styled';

const MobileFilter = ({ children }: { children: any }) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            <DrawerIcon
                onClick={showDrawer}
                size={30}
                cursor="pointer"
                color={theme.colors.textPrimary}
            />

            <Drawer title="Filter" placement="left" onClose={onClose} open={open}>
                <DrawerInner>{children}</DrawerInner>
            </Drawer>
        </>
    );
};

export default MobileFilter;
