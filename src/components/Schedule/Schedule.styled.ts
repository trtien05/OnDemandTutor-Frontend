import styled from 'styled-components';

export const ScheduleWrapper = styled.div<{ hideToolBar: boolean }>`
  .e-schedule .e-time-cells, 
  .e-schedule .e-work-cells, 
  .e-schedule .e-header-cells {
    height: 20px !important; /* Adjust the height of the cells */
    line-height: 20px !important; /* Ensure text fits within the adjusted height */
    padding: 0 !important;
    margin: 0 !important;
  }

  .e-schedule .e-time-cells .e-time-slots,
  .e-schedule .e-time-cells,
  .e-schedule .e-time-slots,
  .e-schedule .e-time-slots.e-disable-dates {
    height: 20px !important; /* Adjust the height of time slots */
    line-height: 20px !important; /* Ensure text fits within the adjusted height */
    box-sizing: border-box;
    padding: 0 !important;
    margin: 0 !important;
  }
  
  .e-schedule .e-schedule-toolbar-container {
    display: ${props => props.hideToolBar ? 'none' : 'block'} !important;
  }

  .e-schedule .e-new-event,
  .e-schedule .e-toolbar-right {
        display: none !important;
      }

  .e-schedule .e-header-cells,
  .e-schedule .e-current-day,
  .e-schedule .e-header-row,
  .e-schedule .e-schedule-toolbar-container {
    line-height: 20px !important;
    text-align: center !important;
    padding: 0 !important;
    margin: 0 !important;

    .e-toolbar-left .e-prev,
    .e-toolbar-left .e-next,
    .e-toolbar-left .e-icon-down-arrow{
      display: none; !important;
    }
  }

  .e-schedule .e-header-cells .e-header-date,
  .e-schedule .e-header-cells .e-header-day {
    margin: auto;
  }

  .e-schedule .e-vertical-view .e-time-cells-wrap table td,
  .e-schedule .e-timeslots {
    line-height: 19px !important;
    height: 20px !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  .e-schedule .e-appointment {
    width: 100%;
  }
  

`;
