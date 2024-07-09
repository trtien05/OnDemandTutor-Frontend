import { useEffect, useState } from 'react';
import TutorTable from './TutorTable';
import { getAccountByRole } from '../../../utils/accountAPI';


const ManageTutor = () => {
  const [tutors, setTutors] = useState([]);

  const fetchApi = async () => {
    const response = await getAccountByRole('TUTOR');
    setTutors(response.data.content);
  }

  useEffect(() => {
    fetchApi();
  }, [])
  console.log(tutors)
  const handleReload = () => {
    fetchApi();
  }
  return (
    <div>
      <h2>Manage Tutor</h2>

      {tutors && (
        <div style={{ 'marginTop': '20px' }}>
          <TutorTable tutors={tutors} onReload={handleReload} />
        </div>)
      }
    </div>
  );
}

export default ManageTutor;