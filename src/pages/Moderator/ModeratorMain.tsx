import useAuth from '../../hooks/useAuth';
import { theme } from '../../themes';

const ModeratorMain = () => {
    const { user } = useAuth();
  return (
    <div style={{textAlign:`center`, paddingTop:`30px`}}>
    <h1 style={{color:`${theme.colors.primary}`}}>Welcome, {user?.fullName}</h1>
    <p style={{fontWeight:`500`, fontSize:`18px`, color:`${theme.colors.textSecondary}`}}>MODERATOR MODE</p>
    </div>
  )
}

export default ModeratorMain