import { useData } from "../../../context/DataContext";
import { format } from "date-fns";

const ShowRawData = () => {
  const { fetchedData, selectedTimestamp } = useData();
  
  const dataForSelectedTimestamp = fetchedData.find(data => data.timestamp === selectedTimestamp);

  if (!dataForSelectedTimestamp) {
    return <div>No data found for selected timestamp</div>; 
  }

  const formattedDate = format(new Date(selectedTimestamp), 'PPpp');
  const dataToDisplay = dataForSelectedTimestamp.data;

  return (
    <div className="fetched-data">
      <h5>Meter data for: {formattedDate}</h5>
      {dataToDisplay.map((item, index) => (
        <div key={index}>
          REGISTER: {item.register} VARIABLE: {item.variableName}: {item.value} {item.unit}
        </div>
      ))}
    </div>
  );
};

export default ShowRawData;