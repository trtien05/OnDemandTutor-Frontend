import { Image } from 'antd';
import logo from '../../assets/svg/logo.png';
import * as Styled from './Logo.styled';


const Logo = ({ to }: { to: string }) => {
    return (
        <Styled.LogoWrapper to={to}>
            <Image src={logo} alt="MyTutor." width={60} height={36} preview={false} />
        </Styled.LogoWrapper>
    );
};

export default Logo;
