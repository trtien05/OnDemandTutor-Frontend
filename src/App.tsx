import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from './routes';
// import Profile from './pages/Customer/Profile/Profile';

function App() {

  return (
    <Router>
      <RoutesComponent />
    </Router>
    // <>
    //   <Profile/>
    // </>
  )
}

export default App;
