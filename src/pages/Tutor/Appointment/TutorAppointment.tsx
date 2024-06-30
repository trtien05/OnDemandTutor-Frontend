import React, { useEffect, useState } from 'react';
import { Segmented, Divider, message } from 'antd';
import * as Styled from '../../Student/Appointment/Appointment.styled';
import Container from '../../../components/Container/Container';
import AppointmentList from '../../../components/AppointmentList/AppointmentList';
import { useAuth, useDocumentTitle } from '../../../hooks';
import { getAppointments } from '../../../utils/appointmentAPI';
import type { Appointment } from '../../../components/AppointmentList/Appointment.type';
import AppointmentPagination from '../../Student/Appointment/AppointmentPagination/AppointmentPagination';

const TeachingSchedule = () => {
  useDocumentTitle('Teaching Schedule | MyTutor');

  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState<Appointment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const [viewMode, setViewMode] = useState<'Upcoming' | 'Past'>('Upcoming');
  const user = useAuth();

  useEffect(() => {
    const fetchAppointmentsData = async () => {
      try {
        const accountId = user?.accountId;
        if (accountId) {
          const res = await getAppointments(accountId, 'tutor'); // Pass role to API call
          setList(res.content);
          setTotalPages(res.totalPages);
          setInitLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
        messageApi.error('Failed to fetch appointments');
      }
    };

    fetchAppointmentsData();
  }, [user, messageApi]);

  const handleTabChange = (value: string) => {
    setViewMode(value as 'Upcoming' | 'Past');
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const filteredAppointments = () => {
    if (viewMode === 'Upcoming') {
      return list.filter(appointment => appointment.appointment.appointmentStatus === 'PAID');
    } else if (viewMode === 'Past') {
      return list.filter(appointment => ['DONE', 'CANCELED'].includes(appointment.appointment.appointmentStatus));
    } else {
      return [];
    }
  };

  return (
    <div style={{ backgroundColor: '#fff' }}>
      {contextHolder}

      <Styled.TitleWrapper>
        <Container>
          <Styled.RowWrapper>
            <Segmented<string>
              options={['Upcoming', 'Past']}
              onChange={handleTabChange}
              value={viewMode}
            />
          </Styled.RowWrapper>
          <Divider />
          <Styled.TotalTutorAvaiable level={1}>
            {viewMode} Teaching
          </Styled.TotalTutorAvaiable>
        </Container>
      </Styled.TitleWrapper>

      <AppointmentList initLoading={initLoading} list={filteredAppointments()} />

      {totalPages > 1 && (
        <AppointmentPagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
      )}
    </div>
  );
};

export default TeachingSchedule;
