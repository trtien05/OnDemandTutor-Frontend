import { useEffect, useState } from 'react';
import StudentTable from './StudentTable';
import { getAccountByRole } from '../../../utils/accountAPI';
import { Skeleton } from 'antd';

const ManageStudent = () => {
  const [students, setStudents] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(0);
  const pageSize = 7;

  const fetchApi = async (pageNo: number) => {
    setLoading(true);

    try {
      const response = await getAccountByRole(pageNo, pageSize, 'STUDENT');
      setTotalElements(response.data.totalElements);
      setStudents(response.data.content);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }

  }
  useEffect(() => {
    fetchApi(pageNo);
  }, [pageNo]);

  const handleReload = () => {
    fetchApi(pageNo);
  };
  const handlePageChange = (page: number) => {
    setPageNo(page - 1);
  };
  return (
    <div>
      <h2>Manage Student</h2>
      <Skeleton active loading={loading} style={{ marginTop: '20px' }} paragraph={{ rows: 4 }} title={false}>
        <div style={{ 'marginTop': '20px' }}>
          <StudentTable
            students={students}
            onReload={handleReload}
            onPageChange={handlePageChange}
            currentPage={pageNo + 1}
            pageSize={pageSize}
            totalElements={totalElements}
          />
        </div>
      </Skeleton>


    </div>
  );
}

export default ManageStudent;