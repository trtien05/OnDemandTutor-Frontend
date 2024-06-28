import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from './routes';
import StudentAppointment from './pages/Student/Appointment/StudentAppointment';
import QuestionItem from './components/AppointmentList/AppointmentItem/AppointmentItem';
// import Profile from './pages/Customer/Profile/Profile';

function App() {

  return (
    <Router>
      <RoutesComponent />
    </Router>
    // <>
    //   <StudentAppointment />
    // </>
  )
}

export default App;
