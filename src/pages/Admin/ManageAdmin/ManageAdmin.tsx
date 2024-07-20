import { useEffect, useState } from 'react';
import { Button, Skeleton } from 'antd';
import { getAccountByRole } from '../../../utils/accountAPI';
import AdminTable from './AdminTable';
import { Link } from 'react-router-dom';
import config from '../../../config';

const ManageAdmin = () => {
  const [admin, setAdmin] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(0);
  const pageSize = 7;

  const fetchApi = async (pageNo: number) => {
    setLoading(true);

    try {
      const response = await getAccountByRole(pageNo, pageSize, 'ADMIN');
      setTotalElements(response.data.totalElements);
      setAdmin(response.data.content);
    } catch (error) {
      console.error('Error fetching Admins:', error);
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
      <div style={{ display: 'flex' }}>
        <h2>Manage Admin</h2>
        <div style={{ margin: '0 20px' }}>
          <Link to={config.routes.admin.createAdmin}>
            <Button>Create Admin</Button>
          </Link>
        </div>

      </div>

      <Skeleton active loading={loading} style={{ marginTop: '20px' }} paragraph={{ rows: 4 }} title={false}>
        <div style={{ marginTop: '20px' }}>
          <AdminTable
            admins={admin}
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
};

export default ManageAdmin;
