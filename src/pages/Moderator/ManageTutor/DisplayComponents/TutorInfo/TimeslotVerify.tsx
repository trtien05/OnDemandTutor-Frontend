import React from 'react'
import { Schedule } from '../../Tutor.type';

interface TimeslotVerifyProps {
    schedule: Schedule[];
    toggleSwitch: () => void;
    switchStates: boolean;
    handleChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const TimeslotVerify: React.FC<TimeslotVerifyProps> = (props) => {
    // const setSwitchStates = () => {
    //     props.handleChange(!props.switchStates);
    // }
    const dayOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return (
        <div
            // onClick={props.toggleSwitch}
            style={{ display: `flex`, justifyContent: `flex-start`, marginTop:`10px` }}>
            <div style={{ display: `flex`, flexWrap:`wrap`, justifyContent:`flex-start` }}>
                {props.schedule.map((day, index: number) => (
                    <div style={{ width: `190px`, marginTop:`0px`, textAlign:`center`, marginBottom:`10px` }} key={index} >
                        <h4>{dayOfWeek[index]}</h4>
                        {day.timeslots.length > 0 && day.timeslots.map((timeslot, index: number) => (
                                <div key={index}>
                                    <p style={{textAlign:`center`}}>{timeslot.startTime} - {timeslot.endTime}</p>
                                </div>
                            )
                        )}
                    </div>
                )
                )}

            </div>
        </div>
    )
}

export default TimeslotVerify