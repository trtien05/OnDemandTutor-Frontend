import { useEffect, useState } from 'react';
import TutorTable from './DisplayComponents/TutorTable';
import { Tutor } from './Tutor.type';
import { getTutorByStatus } from '../../../utils/moderatorAPI';
import { Skeleton } from 'antd';

const ManageTutor = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 7,
  });
  const [total, setTotal] = useState({
    totalElements: 0,
    totalPages: 0,
  })

  const fetchApi = async () => {
    setLoading(true);
    try {
      const response = await getTutorByStatus(pagination.current - 1, pagination.pageSize, 'PROCESSING');
      setTutors(response.data.content);
      setTotal({ totalElements: response.data.totalElements, totalPages: response.data.totalPages });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApi();
  }, [pagination])

  const handleReload = () => {
    fetchApi();
  }
  return (
    <div>
      <h2>Processing Tutor</h2>
      <Skeleton active loading={loading} title={false} style={{ marginTop: '20px' }} paragraph={{ rows: 4 }}>
        <div style={{ 'marginTop': '20px' }}>
          <TutorTable pagination={pagination} setPagination={setPagination} total={total} tutors={tutors} onReload={handleReload} manage={'tutor'} />
        </div>
      </Skeleton>
    </div>
  );
}

export default ManageTutor;