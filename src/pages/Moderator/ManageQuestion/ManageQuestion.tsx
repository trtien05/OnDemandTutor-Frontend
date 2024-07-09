import { useEffect, useState } from 'react';

import { getQuestionByStatus } from '../../../utils/moderatorAPI';
import { Question } from '../../../components/QuestionList/Question.type';
import QuestionTable from './QuestionTable';
import { Skeleton } from 'antd';

const ManageQuestion = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchApi = async () => {
    try {
      const response = await getQuestionByStatus('PROCESSING');
      setQuestions(response.data.content);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApi();
  }, [])

  const handleReload = () => {
    fetchApi();
  }
  return (
    <div style={{ 'height': '100vh' }}>
      <h2>Processing Tutor's Documents</h2>
      <Skeleton active loading={loading} title={false} style={{ marginTop: '20px' }} paragraph={{ rows: 4 }}>
        <div style={{ 'marginTop': '20px' }}>
          <QuestionTable questions={questions} onReload={handleReload} />
        </div>
      </Skeleton>
    </div>
  );
}

export default ManageQuestion;