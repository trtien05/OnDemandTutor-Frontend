import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from './routes';
import Appointment from './pages/Student/Appointment/Appointment';
import QuestionItem from './components/AppointmentList/AppointmentItem/AppointmentItem';
// import Profile from './pages/Customer/Profile/Profile';

function App() {

  return (
    <Router>
      <RoutesComponent />
    </Router>
    // <>
    //   <Appointment />
    // </>
  )
}

export default App;
