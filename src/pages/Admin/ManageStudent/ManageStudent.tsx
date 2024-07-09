import { useEffect, useState } from 'react';
import StudentTable from './StudentTable';
import { getAccountByRole } from '../../../utils/accountAPI';

const ManageStudent = () => {
  const [students, setStudents] = useState([]);

  const fetchApi = async () => {
    const response = await getAccountByRole('STUDENT');
    setStudents(response.data.content);
  }

  useEffect(() => {
    fetchApi();
  }, [])

  const handleReload = () => {
    fetchApi();
  }
  console.log(students);
  return (
    <div>
      <h2>Manage Student</h2>

      {students && (
        <div style={{ 'marginTop': '20px' }}>
          <StudentTable students={students} onReload={handleReload} />
        </div>)
      }
    </div>
  );
}

export default ManageStudent;