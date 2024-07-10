import { useEffect, useState } from 'react';

import { getTutorWithPendingDocument } from '../../../utils/moderatorAPI';
import { Tutor } from '../ManageTutor/Tutor.type';
import TutorTable from '../ManageTutor/DisplayComponents/TutorTable';
import { Skeleton } from 'antd';
const ManageDocument = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApi = async () => {
    setLoading(true);
    try {
      const response = await getTutorWithPendingDocument();
      setTutors(response.data.content);
    } finally {
      setLoading(false);
    }
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
      <Skeleton active loading={loading} title={false} style={{ marginTop: '20px' }} paragraph={{ rows: 4 }}>
        <div style={{ 'marginTop': '20px' }}>
          <TutorTable tutors={tutors} onReload={handleReload} manage='document' />
        </div>
      </Skeleton>
    </div>
  );
}

export default ManageDocument;