import { useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import { getAccountByRole } from '../../../utils/accountAPI';
import ModeratorTable from './ModeratorTable';

const ManageModerator = () => {
  const [moderator, setModerator] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(0);
  const pageSize = 7;

  const fetchApi = async (pageNo: number) => {
    setLoading(true);

    try {
      const response = await getAccountByRole(pageNo, pageSize, 'MODERATOR');
      setTotalElements(response.data.totalElements);
      setModerator(response.data.content);
    } catch (error) {
      console.error('Error fetching moderators:', error);
    } finally {
      setLoading(false);
    }
  };
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
      <h2>Manage Moderator</h2>
      <Skeleton active loading={loading} style={{ marginTop: '20px' }} paragraph={{ rows: 4 }} title={false}>
        <div style={{ marginTop: '20px' }}>
          <ModeratorTable
            moderators={moderator}
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
};

export default ManageModerator;
