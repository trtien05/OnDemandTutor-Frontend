import { Skeleton } from 'antd';
import { useEffect, useState } from 'react'
import { getWithdrawRequest } from '../../../utils/salaryAPI';
import SalaryTable from './SalaryTable';

const ManageSalary = () => {
  const [requestSalary, setRequestSalary] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApi = async () => {
    try {
      const response = await getWithdrawRequest();
      setRequestSalary(response.data.content);
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
  console.log(requestSalary)

  return (
    <div>
      <h2>Manage Moderator</h2>
      <Skeleton active loading={loading} style={{ marginTop: '20px' }} paragraph={{ rows: 4 }} title={false}>
        <div style={{ marginTop: '20px' }}>
          <SalaryTable withdrawRequest={requestSalary} onReload={handleReload} />
        </div>
      </Skeleton>

    </div>
  );
}

export default ManageSalary