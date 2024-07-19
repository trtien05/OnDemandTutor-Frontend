
import { Select, Skeleton } from "antd";
import TutorReportTable from "./TutorReportTable";
import { useEffect, useState } from "react";
import { getTutorReport } from "../../../../utils/appointmentAPI";
const { Option } = Select;
import * as Styled from './ManageProfitByTutor.styled';

const ManageProfitByTutor = () => {
  const [reportByTutor, setReportByTutor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState<number>();
  const [year, setYear] = useState<number>();

  const handleMonthChange = (value: unknown) => {
    setMonth(value as number);
  };

  const handleYearChange = (value: unknown) => {
    setYear(value as number);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await getTutorReport(month, year);
      setReportByTutor(response.data);
    } catch (error) {
      console.error('Error fetching report:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const response = await getTutorReport();
        setReportByTutor(response.data);
      } catch (error) {
        console.error('Error fetching report:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Salary management by Tutor</h2>
        <div >
          <Styled.StyledSelect
            placeholder="Choose Month"
            onChange={handleMonthChange}
            allowClear
            style={{ width: 200 }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <Option key={i + 1} value={i + 1}>{i + 1}</Option>
            ))}
          </Styled.StyledSelect>
          <Styled.StyledSelect
            placeholder="Choose Year"
            onChange={handleYearChange}
            allowClear
            style={{ width: 200 }}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <Option key={new Date().getFullYear() - i} value={new Date().getFullYear() - i}>{new Date().getFullYear() - i}</Option>
            ))}
          </Styled.StyledSelect>
          <Styled.ButtonStyled type="primary" onClick={handleSave}>Save</Styled.ButtonStyled>

        </div>

      </div>
      <Skeleton active loading={loading} style={{ marginTop: '20px' }} paragraph={{ rows: 4 }} title={false}>
        <div style={{ marginTop: '20px' }}>
          <TutorReportTable reportByTutor={reportByTutor} loading={loading} />
        </div>
      </Skeleton>
    </div>)
}

export default ManageProfitByTutor