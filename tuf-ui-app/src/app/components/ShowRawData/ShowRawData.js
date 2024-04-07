import { useData } from '../../../context/DataContext';
import { format } from 'date-fns';

const ShowRawData = ({ fontSize, customHeight }) => {
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
    <div className="fetched-data" style={{ maxHeight: customHeight }}>
      
      <div style={{ fontSize: `${fontSize}px` }}>
        <h4><strong>METER DATA: {formattedDate}</strong></h4>
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