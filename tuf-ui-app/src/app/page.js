"use client";

import React, { useState } from "react";
import { DataProvider } from "../context/DataContext";
import ControlButtons from "./components/ControlButtons/ControlButtons";
import CustomDatePicker from "./components/CustomDatePicker/CustomDatePicker";
import Sidebar from "./components/Sidebar/Sidebar";
import ShowRawData from "./components/ShowRawData/ShowRawData";

export default function Home() {
  const [isCalendarVisible, setIsCalendarVisible] = useState(true);
  const [fontSize, setFontSize] = useState(14);

  const sidebarHeight = isCalendarVisible ? "50vh" : "80vh";
  const dataAreaHeight = isCalendarVisible ? "50vh" : "80vh";
  const handleCalendarVisibility = () => setIsCalendarVisible(!isCalendarVisible);

  const increaseFontSize = () => setFontSize(fontSize + 1);
  const decreaseFontSize = () => setFontSize(fontSize > 1 ? fontSize - 1 : 1);


  return (
    <DataProvider>
      <div className="app-container">
        <div className="calendar-and-controls">
          <ControlButtons          
            handleCalendarVisibility={handleCalendarVisibility}
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
          />
          <CustomDatePicker 
            isCalendarVisible={isCalendarVisible} 
            setIsCalendarVisible={setIsCalendarVisible} 
          />
          </div>
          <div className="content-area">
            <Sidebar customHeight={sidebarHeight}/>
            <div className={`data-display-area ${isCalendarVisible ? 'small' : 'large'}`}
               style={{ maxHeight: dataAreaHeight }}>
              <ShowRawData fontSize={fontSize}/>
          </div>
        </div>
      </div>
    </DataProvider>
  );  
};
