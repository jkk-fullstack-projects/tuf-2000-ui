import React from 'react';
import { useData } from '../../../context/DataContext';
import { format } from 'date-fns';

/**
 * Component to display fetched data based on the selected timestamp.
 * Utilizes DataContext for state management and date-fns for date formatting.
 *
 * @component
 * @param {Object} props
 * @param {number} props.fontSize - The font size to be applied to the displayed data.
 * @returns JSX.Element
 */

const ShowRawData = ({ fontSize }) => {
  const { fetchedData, selectedTimestamp } = useData();
  
  const dataForSelectedTimestamp = fetchedData.find(data => data.timestamp === selectedTimestamp);

  if (!dataForSelectedTimestamp) {
    return (
    <div>
      <p>No data available for the selected timestamp.</p>
      <p>Please choose a date between March 4, 2024, and April 2, 2024,</p>
      <p>or select a specific timestamp from the sidebar on the left.</p>
    </div>
    );
}

  const formattedDate = format(new Date(selectedTimestamp), 'PPpp');
  const dataToDisplay = dataForSelectedTimestamp.data;

  return (
    <div className="fetched-data">
      <h5><strong>Data at: {formattedDate}</strong></h5>
      <div style={{ fontSize: `${fontSize}px` }}>
        {dataToDisplay.map((item, index) => (
          <div key={index}>
            REG: {item.register} VAR: {item.variableName}: {item.value} {item.unit}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowRawData;