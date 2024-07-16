import { useEffect, useState } from 'react';
import TutorTable from './TutorTable';
import { getAccountByRole } from '../../../utils/accountAPI';
import { Skeleton } from 'antd';


const ManageTutor = () => {
  const [tutors, setTutors] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(0);
  const pageSize = 7;

  const fetchApi = async (pageNo: number) => {
    setLoading(true);

    try {
      const response = await getAccountByRole(pageNo, pageSize, 'TUTOR');
      setTotalElements(response.data.totalElements);
      setTutors(response.data.content);
    } catch (error) {
      console.error('Error fetching tutors:', error);
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
      <h2>Manage Tutor</h2>
      <Skeleton active loading={loading} style={{ marginTop: '20px' }} paragraph={{ rows: 4 }} title={false}>
        <div style={{ 'marginTop': '20px' }}>
          <TutorTable
            tutors={tutors}
            onReload={handleReload}
            onPageChange={handlePageChange}
            currentPage={pageNo + 1}
            pageSize={pageSize}
            totalElements={totalElements}
            loading={loading}
          />
        </div>
      </Skeleton>
    </div>
  );
}

export default ManageTutor;