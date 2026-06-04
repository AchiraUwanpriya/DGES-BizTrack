import React from 'react';
import DatePicker from 'react-date-picker';

const YearPicker = (props) => {
  const handleYearChange = (year) => {
    if (props.onYearChange) {
      props.onYearChange(year);
    }
  };

  return (
    <DatePicker
      {...props}
      format="y"
      maxDetail="decade"  // Only show decades (years)
      minDetail="decade"  // Limit the user's ability to navigate further
      onChange={handleYearChange}
      calendarIcon={null}
      clearIcon={null}
    />
  );
};

export default YearPicker;
