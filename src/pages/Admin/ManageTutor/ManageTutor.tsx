import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Button } from 'antd';
import TutorTable from './TutorTable';
import { getTutorList } from '../../../utils/tutorAPI';

interface Education {
  degreeType?: string;
  majorName?: string;
  specialization?: string;
  verified?: boolean;
};

interface Tutor {
  id: number;
  fullName?: string;
  avatarUrl?: string;
  teachingPricePerHour: number;
  educations?: Education;
  subjects: string[],
  averageRating?: number;
  loading: boolean;
};

const ManageTutor = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);

  const fetchApi = async () => {
    const response = await getListTutor();
    setTutors(response.data.content);
  }

  useEffect(() => {
    fetchApi();
  }, [])

  const handleReload = () => {
    fetchApi();
  }
  console.log(tutors);
  return (
    <div style={{ 'height': '100vh' }}>
      <h2>Manage Tutor</h2>

      {tutors && (
        <div style={{ 'marginTop': '20px' }}>
          <TutorTable tutors={tutors} onReload={handleReload} />
        </div>)
      }
    </div>
  );
}

export default ManageTutor;