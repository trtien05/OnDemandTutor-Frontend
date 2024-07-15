import { useEffect, useState } from 'react';
import TutorTable from './DisplayComponents/TutorTable';
import { Tutor } from './Tutor.type';
import { getTutorByStatus } from '../../../utils/moderatorAPI';
import { Skeleton } from 'antd';

const ManageTutor = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApi = async () => {
    setLoading(true);
    try {
      const response = await getTutorByStatus('PROCESSING');
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
    <div>
      <h2>Processing Tutor</h2>
      <Skeleton active loading={loading} title={false} style={{ marginTop: '20px' }} paragraph={{ rows: 4 }}>
        <div style={{ 'marginTop': '20px' }}>
          <TutorTable tutors={tutors} onReload={handleReload} manage={'tutor'} />
        </div>
      </Skeleton>
    </div>
  );
}

export default ManageTutor;