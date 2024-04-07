"use client";

import React, { useState } from "react";
import { DataProvider } from "../context/DataContext";
import CustomDatePicker from "./components/CustomDatePicker/CustomDatePicker";
import Sidebar from "./components/Sidebar/Sidebar";
import ShowRawData from "./components/ShowRawData/ShowRawData";

export default function Home() {
  const [isCalendarVisible, setIsCalendarVisible] = useState(true);
  const [fontSize, setFontSize] = useState(14);

  const sidebarHeight = isCalendarVisible ? "50vh" : "80vh";
  const dataAreaHeight = isCalendarVisible ? "50vh" : "80vh";
  
  const increaseFontSize = () => setFontSize((prevSize) => prevSize + 1);
  const decreaseFontSize = () => setFontSize((prevSize) => prevSize - 1);

  return (
    <DataProvider>
      <div className="app-container">
        <div className="calendar-and-controls">
          <CustomDatePicker 
            isCalendarVisible={isCalendarVisible} 
            setIsCalendarVisible={setIsCalendarVisible} 
          />
          </div>
          <div className="content-area">
            <Sidebar customHeight={sidebarHeight}/>
            <div className={`data-display-area ${isCalendarVisible ? 'small' : 'large'}`}
               style={{ maxHeight: dataAreaHeight }}>
              <ShowRawData />
          </div>
        </div>
      </div>
    </DataProvider>
  );  
};
