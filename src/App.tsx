import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from './routes';
import SearchQuestions from './pages/Questions/SearchQuestions';

function App() {
  return (
    // <Router>
    //   <RoutesComponent />
    // </Router>
    <SearchQuestions/>
  )
}

export default App
