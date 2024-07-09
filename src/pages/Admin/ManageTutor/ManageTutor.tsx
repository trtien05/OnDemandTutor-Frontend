import { useEffect, useState } from 'react';
import TutorTable from './TutorTable';
import { getAccountByRole } from '../../../utils/accountAPI';
import { Skeleton } from 'antd';


const ManageTutor = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApi = async () => {
    try {
      const response = await getAccountByRole('TUTOR');
      setTutors(response.data.content);
    } catch (error) {
      console.error('Error fetching tutors:', error);
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
      <h2>Manage Tutor</h2>
      <Skeleton active loading={loading} style={{ marginTop: '20px' }} paragraph={{ rows: 4 }} title={false}>
        <div style={{ 'marginTop': '20px' }}>
          <TutorTable tutors={tutors} onReload={handleReload} />
        </div>
      </Skeleton>
    </div>
  );
}

export default ManageTutor;