import React, { useEffect, useState } from 'react';

import { getAccountByRole } from '../../../utils/accountAPI';
import ModeratorTable from './ModeratorTable';

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

const ManageModerator = () => {
  const [moderator, setModerator] = useState([]);

  const fetchApi = async () => {
    const response = await getAccountByRole('MODERATOR');
    setModerator(response.data.content);
  }

  useEffect(() => {
    fetchApi();
  }, [])

  const handleReload = () => {
    fetchApi();
  }
  console.log(moderator);
  return (
    <div style={{ 'height': '100vh' }}>
      <h2>Manage Moderator</h2>

      {moderator && (
        <div style={{ 'marginTop': '20px' }}>
          <ModeratorTable tutors={moderator} onReload={handleReload} />
        </div>)
      }
    </div>
  );
}

export default ManageModerator;