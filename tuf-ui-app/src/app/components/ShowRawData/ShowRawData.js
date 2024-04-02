import { useData } from "@/context/DataContext";

const ShowRawData = () => {
  const { fetchedData } = useData();

  if (!fetchedData || !fetchedData.data) {
    return <div>No data found</div>; 
  }

  return (
    <div className="fetched-data">
      <h5>Fetched Data:</h5>
      {fetchedData.data.map((item, index) => (
        <div key={index}>
          REGISTER: {item.register} VARIABLE: {item.variableName}: {item.value} {item.unit}
        </div>
      ))}
    </div>
  );
};

export default ShowRawData;