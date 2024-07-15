import { useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import { getAccountByRole } from '../../../utils/accountAPI';
import ModeratorTable from './ModeratorTable';

const ManageModerator = () => {
  const [moderator, setModerator] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApi = async () => {
    try {
      const response = await getAccountByRole('MODERATOR');
      setModerator(response.data.content);
    } catch (error) {
      console.error('Error fetching moderators:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleReload = () => {
    fetchApi();
  };

  return (
    <div>
      <h2>Manage Moderator</h2>
      <Skeleton active loading={loading} style={{ marginTop: '20px' }} paragraph={{ rows: 4 }} title={false}>
        <div style={{ marginTop: '20px' }}>
          <ModeratorTable moderators={moderator} onReload={handleReload} />
        </div>
      </Skeleton>

    </div>
  );
};

export default ManageModerator;
