import React, { useEffect, useState } from 'react';
import { Select, Row, Col, message, Segmented } from 'antd';
import * as Styled from '../Appointment/Appointment.styled';
import Container from '../../../components/Container/Container';
import AppointmentList from '../../../components/AppointmentList/AppointmentList'
import { useDocumentTitle } from '../../../hooks';
import type {Appointment} from '../../../components/AppointmentList/Appointment.type';
import Pagination from '../../../components/Pagination/Pagination';
// import CreateQuestion from '../../../components/Popup/CreateQuestion/CreateQuestion';
const { Option } = Select;


const Appointment = () => {
  useDocumentTitle("Appointment | MyTutor")

  const [subject, setSubject] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState<Appointment[]>([]);
  const [data, setData] = useState<Appointment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionPerPage] = useState(4);
  const [totalAmountQuestions, setTotalAmountQuestions] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const [searchUrl, setSearchUrl] = useState('');
  
  const handleSave = () => {
    const searchCriteria = {
      subject,
      searchKeyword,
    };
    let url = ``;

    if (subject !== 'all') {
      url += `&subjects=${subject}`;
    }
    if (searchKeyword !== '') {
      url += `&questionContent=${searchKeyword}`;
    }
    setSearchUrl(url);
    console.log(searchCriteria)
    // console.log(searchUrl);
  };

  useEffect(() => {
    
    const baseUrl: string = `http://localhost:8080/api/questions?pageNo=${currentPage - 1}&pageSize=${questionPerPage}&type=UNSOLVED`;
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
        setData(res.content);
        setList(res.content);
        setTotalAmountQuestions(res.totalElements);
        setTotalPages(res.totalPages);
        // console.log("Fetched Data:", res.content);  // Add this line to debug the fetched data
      })
      .catch((err) => console.error('Failed to fetch questions:', err));
    window.scrollTo(0, 0);
    console.log(url);

  }, [currentPage, searchUrl]);
  console.log(currentPage)


  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

const options = [
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
        { label: 'Coding', value: 'Coding' },
    ];
  return (
    <div style={{backgroundColor:'#fff'}}>
    {contextHolder}
      <Styled.FilterSection>
        <Container>
          <Styled.SearchWrapper>
          
            <Row justify='space-between' align='middle' gutter={[20, 20]} style={{ width: '100%' }} >
            <Segmented<string>
                options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']}
                onChange={(value) => {
                console.log(value); // string
                }}
            />
              
            </Row>
          </Styled.SearchWrapper>
        </Container>
      </Styled.FilterSection>

      <Styled.TitleWrapper>
        <Container>
          <Styled.TotalTutorAvaiable level={1}>
            Upcoming lessons
          </Styled.TotalTutorAvaiable>
        </Container>
      </Styled.TitleWrapper>

      <AppointmentList initLoading={initLoading} list={list} />

      {totalPages > 1 &&
        <AppointmentPagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
      }
    </div>


  );
};

export default Appointment;
