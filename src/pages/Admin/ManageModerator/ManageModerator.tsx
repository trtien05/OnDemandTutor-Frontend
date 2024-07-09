import { useEffect, useState } from 'react';

import { getAccountByRole } from '../../../utils/accountAPI';
import ModeratorTable from './ModeratorTable';

const ManageModerator = () => {
  const [moderator, setModerator] = useState([]);

  const fetchApi = async () => {
    const response = await getAccountByRole('MODERATOR');
    setModerator(response.data.content);
  }

  useEffect(() => {
    fetchApi();
  }, [])

  const handleReload = () => {
    fetchApi();
  }
  console.log(moderator);
  return (
    <div>
      <h2>Manage Moderator</h2>

      {moderator && (
        <div style={{ 'marginTop': '20px' }}>
          <ModeratorTable moderators={moderator} onReload={handleReload} />
        </div>)
      }
    </div>
  );
}

export default ManageModerator;