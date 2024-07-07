import { useEffect, useState } from 'react';

import { getTutorWithPendingDocument } from '../../../utils/moderatorAPI';
import { Tutor } from '../ManageTutor/Tutor.type';
import TutorTable from '../ManageTutor/DisplayComponents/TutorTable';
const ManageDocument = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);

  const fetchApi = async () => {
    const response = await getTutorWithPendingDocument();
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
      <h2>Processing Tutor's Documents</h2>

      {tutors && (
        <div style={{ 'marginTop': '20px' }}>
          <TutorTable tutors={tutors} onReload={handleReload} manage='document' />
        </div>)
      }
    </div>
  );
}

export default ManageDocument;