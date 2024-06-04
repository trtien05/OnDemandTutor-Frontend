
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from './routes';
import CreateQuestion from './components/Popup/CreateQuestion';
function App() {

  return (
    <Router>
      <RoutesComponent />
    </Router>
    // <CreateQuestion/>
  )
}

export default App
