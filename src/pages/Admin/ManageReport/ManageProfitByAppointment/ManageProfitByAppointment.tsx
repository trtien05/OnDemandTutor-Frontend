import { useEffect, useState } from "react";
import { getAppointmentReport } from "../../../../utils/appointmentAPI";
import { Skeleton } from "antd";
import AppointmentReportTable from "./AppointmentReportTable";

const ManageProfitByAppointment = () => {
  const [reportByAppointment, setReportByAppointment] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);

      try {
        const response = await getAppointmentReport();
        setReportByAppointment(response.data);
      } catch (error) {
        console.error('Error fetching report:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);
  console.log(reportByAppointment)
  return (
    <div>
      <h2>Salary management by appointment</h2>
      <Skeleton active loading={loading} style={{ marginTop: '20px' }} paragraph={{ rows: 4 }} title={false}>
        <div style={{ marginTop: '20px' }}>
          <AppointmentReportTable reportByAppointment={reportByAppointment} loading={loading} />
        </div>
      </Skeleton>

    </div>
  )
}

export default ManageProfitByAppointment