import { useEffect, useState } from 'react';
import { Select, Row, Col, message, Skeleton } from 'antd';
import * as Styled from './SearchQuestions.styled';
import Container from '../../components/Container';
import QuestionList from '../../components/QuestionList/QuestionList'
import { useDocumentTitle } from '../../hooks';
import { Question } from '../../components/QuestionList/Question.type';
import Pagination from '../../components/Pagination/Pagination';
import CreateQuestion from '../../components/Popup/CreateQuestion/CreateQuestion';
const { Option } = Select;

const SearchQuestions = () => {
  useDocumentTitle("Search Question | MyTutor")

  const [subject, setSubject] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState<Question[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionPerPage] = useState(4);
  const [totalAmountQuestions, setTotalAmountQuestions] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const [searchUrl, setSearchUrl] = useState('');

  const handleSubject = (value: unknown) => {
    setSubject(value as string);
  }
  const handleSave = () => {

    let url = ``;

    if (subject !== 'all') {
      url += `&subjects=${subject}`;
    }
    if (searchKeyword !== '') {
      url += `&questionContent=${searchKeyword}`;
    }
    setSearchUrl(url);

  };

  useEffect(() => {
    setInitLoading(true);
    // const baseUrl: string = `https://my-tutor-render.onrender.com/api/questions?pageNo=${currentPage - 1}&pageSize=${questionPerPage}&type=UNSOLVED`;
    const baseUrl: string = `https://my-tutor-render.onrender.com/api/questions?pageNo=${currentPage - 1}&pageSize=${questionPerPage}&type=UNSOLVED`;

    let url: string = '';

    if (searchUrl === '') {
      url = baseUrl;
    } else {
      url = baseUrl + searchUrl
    }
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setList(res.content);
        setTotalAmountQuestions(res.totalElements);
        setTotalPages(res.totalPages);
      })
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, searchUrl]);


  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const options = [
    { label: 'All', value: 'all' },
    { label: 'Mathematics', value: 'Mathematics' },
    { label: 'Chemistry', value: 'Chemistry' },
    { label: 'Biology', value: 'Biology' },
    { label: 'Literature', value: 'Literature' },
    { label: 'English', value: 'English' },
    { label: 'IELTS', value: 'IELTS' },
    { label: 'TOEFL', value: 'TOEFL' },
    { label: 'TOEIC', value: 'TOEIC' },
    { label: 'Physics', value: 'Physics' },
    { label: 'Geography', value: 'Geography' },
    { label: 'History', value: 'History' },
    { label: 'Coding', value: 'Coding' }

  ];
  return (
    <>
      {contextHolder}
      <Styled.FilterSection>
        <Container>
          <Styled.SearchWrapper>

            <Row justify='space-between' align='middle' gutter={[20, 20]} style={{ width: '100%' }} >
              <Col xs={24} sm={12} md={4} lg={6}>
                <Styled.StyledSelect placeholder="Subject" onChange={handleSubject}>
                  {options.map((option, index) => (
                    <Option key={index} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Styled.StyledSelect>
              </Col>
              <Col xs={24} sm={12} md={8} lg={10}>
                <Styled.InputStyled
                  placeholder="Search by name or keyword"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </Col>

              <Col xs={24} sm={12} md={4} lg={2} >
                <Styled.ButtonStyled type="primary" onClick={handleSave} style={{ width: '100%' }}>Save</Styled.ButtonStyled>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <CreateQuestion messageApi={messageApi} />
              </Col>

            </Row>
          </Styled.SearchWrapper>
        </Container>
      </Styled.FilterSection>
      <Styled.TitleWrapper>
        <Container>
          <Styled.TotalTutorAvaiable level={1}>
            {initLoading ? <Skeleton.Input active size='small' style={{ display: 'flex' }} /> : `${totalAmountQuestions}`} questions available

          </Styled.TotalTutorAvaiable>
        </Container>
      </Styled.TitleWrapper>

      <QuestionList initLoading={initLoading} list={list} />

      {totalPages > 1 &&
        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
      }
    </>


  );
};

export default SearchQuestions;
