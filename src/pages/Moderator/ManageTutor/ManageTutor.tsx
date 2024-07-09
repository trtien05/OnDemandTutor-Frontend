import { useEffect, useState } from 'react';
import TutorTable from './DisplayComponents/TutorTable';
import { Tutor } from './Tutor.type';
import { getTutorByStatus } from '../../../utils/moderatorAPI';

const ManageTutor = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);

  const fetchApi = async () => {
    const response = await getTutorByStatus('PROCESSING');
    setTutors(response.data.content);
  }

  useEffect(() => {
    fetchApi();
  }, [])

  const handleReload = () => {
    fetchApi();
  }
  return (
    <div style={{ 'height': '100vh' }}>
      <h2>Processing Tutor</h2>

      {tutors && (
        <div style={{ 'marginTop': '20px' }}>
          <TutorTable tutors={tutors} onReload={handleReload} manage={'tutor'} />
        </div>)
      }
    </div>
  );
}

export default ManageTutor;