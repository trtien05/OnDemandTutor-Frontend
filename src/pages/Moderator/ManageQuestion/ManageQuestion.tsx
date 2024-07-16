import { useEffect, useState } from 'react';

import { getQuestionByStatus } from '../../../utils/moderatorAPI';
import { Question } from '../../../components/QuestionList/Question.type';
import QuestionTable from './QuestionTable';
import { Skeleton } from 'antd';

const ManageQuestion = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
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
      const response = await getQuestionByStatus(pagination.current - 1, pagination.pageSize, 'PROCESSING');
      setQuestions(response.data.content);
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
    <div >
      <h2>Processing Question</h2>
      <Skeleton active loading={loading} title={false} style={{ marginTop: '20px' }} paragraph={{ rows: 4 }}>
        <div style={{ 'marginTop': '20px' }}>
          <QuestionTable
            total={total}
            pagination={pagination}
            setPagination={setPagination}
            questions={questions}
            onReload={handleReload}
            loading={loading}
          />
        </div>
      </Skeleton>
    </div>
  );
}

export default ManageQuestion;