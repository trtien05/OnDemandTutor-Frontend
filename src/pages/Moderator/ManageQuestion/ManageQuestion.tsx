import { useEffect, useState } from 'react';

import { getQuestionByStatus } from '../../../utils/moderatorAPI';
import { Question } from '../../../components/QuestionList/Question.type';
import QuestionTable from './QuestionTable';

const ManageQuestion = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const fetchApi = async () => {
    const response = await getQuestionByStatus('PROCESSING');
    console.log(response.data.content)
    setQuestions(response.data.content);
    console.log('questions: ',questions)
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

      {questions && (
        <div style={{ 'marginTop': '20px' }}>
            
          <QuestionTable questions={questions} onReload={handleReload} />
        </div>)
      }
    </div>
  );
}

export default ManageQuestion;