import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Modal, Select, message } from 'antd';
import * as FormStyled from '../../../pages/BecomeTutor/Form.styled'
import Table, { ColumnsType } from 'antd/lib/table';
import { format } from 'date-fns';

interface Schedule {
    id: number;
    schedule_date: string;
    start_time: string;
    end_time: string;
    tutor_id: number;
}

const BookTutor: React.FC = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [schedule, setSchedule] = useState<Schedule[]>([]);
    const [form] = Form.useForm();
    const tutorId = 1;

    useEffect(() => {
        const fetchSchedule = async () => {
          try {
            const response = {
              data: [
                { id: 1, schedule_date: '2024-06-04', start_time: '10:00:00', end_time: '11:00:00', tutor_id: 1 },
                { id: 2, schedule_date: '2024-06-04', start_time: '12:00:00', end_time: '13:00:00', tutor_id: 1 },
                { id: 3, schedule_date: '2024-06-05', start_time: '14:00:00', end_time: '15:00:00', tutor_id: 1 },
                { id: 4, schedule_date: '2024-06-06', start_time: '16:00:00', end_time: '17:00:00', tutor_id: 1 },
              ],
            };
            setSchedule(response.data);
          } catch (error) {
            console.error('Failed to fetch schedule', error);
          }
        };
    
        fetchSchedule();
      }, []);
    
      const handleSlotSelect = (slotId: number) => {
        const selectedSlots = form.getFieldValue('selectedSlots') || new Set<number>();
        if (selectedSlots.has(slotId)) {
          selectedSlots.delete(slotId);
        } else {
          if (selectedSlots.size < 5) {
            selectedSlots.add(slotId);
          } else {
            message.warning('You can only select up to 5 time slots');
          }
        }
        form.setFieldsValue({ selectedSlots: new Set(selectedSlots) });
      };
    
      const columns: ColumnsType<Schedule> = [];
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    const formattedDate = format(date, 'EEE, MMM d');
    const dateKey = format(date, 'yyyy-MM-dd');
    return {
      title: formattedDate,
      dataIndex: dateKey,
      key: dateKey,
      render: () => {
        const timeSlots = schedule.filter(slot => slot.schedule_date === dateKey);
        return (
          <>
            {timeSlots.map(slot => (
              <div key={slot.id} style={{ marginBottom: 8 }}>
                <Checkbox
                  checked={form.getFieldValue('selectedSlots')?.has(slot.id) || false}
                  onChange={() => handleSlotSelect(slot.id)}
                >
                  {format(new Date(`${slot.schedule_date}T${slot.start_time}`), 'HH:mm')} - {format(new Date(`${slot.schedule_date}T${slot.end_time}`), 'HH:mm')}
                </Checkbox>
              </div>
            ))}
          </>
        );
      },
    };
  });
    

    columns.push(...days);
    const handleFinish = (values: any) => {

    }

    //fetch api to select tutor's subject
    const subjects = [
        { label: "Mathematics", value: "Mathematics" },
        { label: "Chemistry", value: "Chemistry" },
        { label: "Biology", value: "Biology" },
        { label: "Literature", value: "Literature" },
        { label: "English", value: "English" },
        { label: "IELTS", value: "IELTS" },
        { label: "TOEFL", value: "TOEFL" },
        { label: "TOEIC", value: "TOEIC" },
        { label: "Physics", value: "Physics" },
        { label: "Geography", value: "Geography" },
        { label: "History", value: "History" },
        { label: "Coding", value: "Coding" },
    ];

    const showModal = () => {
        setIsFormOpen(true);
    };

    const handleOk = () => {
        setIsFormOpen(false);
    };

    const handleCancel = () => {
        setIsFormOpen(false);
    };


    return (
        <>
            <Button type="primary" onClick={showModal}>
                Book this tutor
            </Button>
            <Modal
                centered
                open={isFormOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key='cancel' type='default'>Cancel</Button>,
                    <Button key='book' type='default'>Book</Button>
                ]}
            >
                <FormStyled.FormWrapper
                    labelAlign='left'
                    layout="vertical"
                    requiredMark={false}
                    size="middle"
                    onFinish={handleFinish}
                    initialValues={{ selectedSlots: new Set<number>() }}>
                    <FormStyled.FormTitle style={{ margin: `auto` }}>Tutor Booking</FormStyled.FormTitle>
                    <Table
                        dataSource={[]}// We use an empty object since we don't use row data
                        columns={columns}
                        pagination={false}
                        rowKey={() => 'dummy'}
                    />

                    <FormStyled.FormItem
                        name="subject"
                        rules={[
                            {
                                required: true,
                                message: "Please select the subject",
                            },
                        ]}
                        $width="50%"
                        //initialValue={field.initialValue}
                        validateFirst
                    >
                        <Select size="large" placeholder="Select subject">
                            {subjects.map((subject) => (
                                <Select.Option value={subject.value}>{subject.label}</Select.Option>
                            ))}
                        </Select>

                    </FormStyled.FormItem>

                </FormStyled.FormWrapper>

            </Modal>
        </>
    );
};

export default BookTutor;