import { useEffect, useState } from 'react';
import { message, Divider, Modal } from 'antd';
import * as Styled from '../../Student/Appointment/Appointment.styled';
import Container from '../../../components/Container/Container';
import AppointmentList from '../../../components/AppointmentList/AppointmentList'
import { useAuth, useDocumentTitle } from '../../../hooks';
import type { TimeSlot } from '../../../components/AppointmentList/Appointment.type';

import AppointmentPagination from '../../Student/Appointment/AppointmentPagination/AppointmentPagination';

import { cancelAppointment } from '../../../utils/appointmentAPI'; 
import { ExclamationCircleOutlined } from '@ant-design/icons';
import config from '../../../config';


const StudentAppointment = () => {
  useDocumentTitle("My Schedule | MyTutor")


  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState<TimeSlot[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [appointmentsPerPage] = useState(5);
  const [messageApi, contextHolder] = message.useMessage();
  const [modal, contextHolderModal] = Modal.useModal();
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<'Upcoming' | 'Past'>('Upcoming'); // State to manage view mode
  const [update, setIsUpdate] = useState(false);

  let isDone = false;
  if (viewMode === 'Past') {
    isDone = true;
  }

  useEffect(() => {
    if (!user) return;
    setInitLoading(true);
    const baseUrl: string = `${config.publicRuntime.API_URL}/api/schedules/accounts/${user?.id}?isDone=${isDone}&isLearner=false&pageNo=${currentPage - 1}&pageSize=${appointmentsPerPage}`;

    fetch(baseUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setList(res.content);
        setTotalPages(res.totalPages);
      })
      .catch((err) => console.error('Failed to fetch tutor appointment:', err));
    window.scrollTo(0, 0);

  }, [appointmentsPerPage, currentPage, user, viewMode, update, isDone]);

  const handleTabChange = (value: any) => {
    setViewMode(value as 'Upcoming' | 'Past');
  };
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const confirmCancel = (timeslotId: number) => {
    modal.confirm({
      centered: true,
      title: 'Do you want to cancel this lesson?',
      content: 'Cancel this timeslot will not be refunded. Do you want to proceed?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Confirm',
      onOk: () => handleCancelAppointment(timeslotId),
      cancelText: 'Back',
    });
  };
  const handleCancelAppointment = (timeslotId: number) => {
    if (!user) return;
    cancelAppointment(timeslotId, user.id)
      .then(() => {
        messageApi.success('Lesson canceled successfully');
        // Refetch appointments after cancellation
        setCurrentPage(1); // Reset to first page
        setIsUpdate(!update);
      })
      .catch(error => {
        messageApi.error('Failed to cancel lesson');
        console.error('Failed to cancel lesson:', error);
      });
  };

  return (
    <div style={{ backgroundColor: '#fff', paddingBottom: '30px' }}>
      {contextHolder}
      {contextHolderModal}
      <Styled.TitleWrapper>
        <Container >
          <Styled.RowWrapper>
            <Styled.StyledSegmented
              options={['Upcoming', 'Past']}
              onChange={handleTabChange}
              value={viewMode}
            />
          </Styled.RowWrapper>
          <Divider />
          <Styled.TotalTutorAvaiable level={1}>
            {viewMode} Teaching Lessons
          </Styled.TotalTutorAvaiable>

        </Container>
      </Styled.TitleWrapper>

      <AppointmentList initLoading={initLoading} list={list} onCancel={confirmCancel} viewMode={viewMode} role='TUTOR' />

      {totalPages > 1 &&
        <AppointmentPagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
      }
    </div>


  );
};

export default StudentAppointment;
