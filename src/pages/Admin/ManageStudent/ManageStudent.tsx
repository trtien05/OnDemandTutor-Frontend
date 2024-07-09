import { useEffect, useState } from 'react';
import StudentTable from './StudentTable';
import { getAccountByRole } from '../../../utils/accountAPI';
import { Skeleton } from 'antd';

const ManageStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApi = async () => {
    try {
      const response = await getAccountByRole('STUDENT');
      setStudents(response.data.content);
    } catch (error) {
      console.error('Error fetching students:', error);
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
      <h2>Manage Student</h2>
      <Skeleton active loading={loading} style={{ marginTop: '20px' }} paragraph={{ rows: 4 }} title={false}>
        <div style={{ 'marginTop': '20px' }}>
          <StudentTable students={students} onReload={handleReload} />
        </div>
      </Skeleton>


    </div>
  );
}

export default ManageStudent;