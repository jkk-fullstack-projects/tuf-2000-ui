import { useData } from "../../../context/DataContext";

const ShowRawData = () => {
  const { fetchedData, selectedTimestamp } = useData();
  
  const dataForSelectedTimestamp = fetchedData.find(data => data.timestamp === selectedTimestamp);


  if (!dataForSelectedTimestamp) {
    return <div>No data found for selected timestamp</div>; 
  }

  const dataToDisplay = dataForSelectedTimestamp.data;

  return (
    <div className="fetched-data">
      <h5>Fetched Data:</h5>
      {dataToDisplay.map((item, index) => (
        <div key={index}>
          REGISTER: {item.register} VARIABLE: {item.variableName}: {item.value} {item.unit}
        </div>
      ))}
    </div>
  );
};

export default ShowRawData;