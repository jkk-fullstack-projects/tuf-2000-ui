import { useData } from "../../../context/DataContext";

const ShowRawData = () => {
  const { fetchedData } = useData();

  if (!fetchedData.length || !fetchedData[0].data) {
    return <div>No data found</div>; 
  }

  const dataToDisplay = fetchedData[0].data;

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