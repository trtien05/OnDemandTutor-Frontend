import { Skeleton } from 'antd';
import { useEffect, useState } from 'react'
import { getWithdrawRequest } from '../../../utils/salaryAPI';
import SalaryTable from './SalaryTable';

const ManageSalary = () => {
  const [requestSalary, setRequestSalary] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(0);
  const pageSize = 7;

  const fetchApi = async (pageNo: number) => {
    setLoading(true);

    try {
      const response = await getWithdrawRequest(pageNo, pageSize);
      setTotalElements(response.data.totalElements);
      setRequestSalary(response.data.content);
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
      <h2>Manage Salary</h2>
      <Skeleton active loading={loading} style={{ marginTop: '20px' }} paragraph={{ rows: 4 }} title={false}>
        <div style={{ marginTop: '20px' }}>
          <SalaryTable
            withdrawRequest={requestSalary}
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

export default ManageSalary