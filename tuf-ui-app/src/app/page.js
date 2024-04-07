"use client";

import React, { useEffect, useState } from "react";
import { DataProvider } from "../context/DataContext";
import ControlButtons from "./components/ControlButtons/ControlButtons";
import CustomDatePicker from "./components/CustomDatePicker/CustomDatePicker";
import Sidebar from "./components/Sidebar/Sidebar";
import ShowRawData from "./components/ShowRawData/ShowRawData";

export default function Home() {
  const [isCalendarVisible, setIsCalendarVisible] = useState(true);
  const [fontSize, setFontSize] = useState(14);

  const [sidebarHeight, setSidebarHeight] = useState("50vh");
  const [dataAreaHeight, setDataAreaHeight] = useState("50vh");
  const [calendarHeight, setCalendarHeight] = useState("50vh");

  useEffect(() => {
    if (!isCalendarVisible) {
        // Reduce the heights to accommodate the calendar being visible or not
        setSidebarHeight("100vh");
        setDataAreaHeight("100vh");
    } else {
        setSidebarHeight("60vh");
        setDataAreaHeight("60vh");
        setCalendarHeight("80vh");
    }
  }, [isCalendarVisible]);

  const toggleCalendarVisibility = () => {
    console.log("Calendar visibility toggling to:", !isCalendarVisible);
    setIsCalendarVisible(!isCalendarVisible);
  };

  const increaseFontSize = () => setFontSize(fontSize + 1);
  const decreaseFontSize = () => setFontSize(fontSize > 1 ? fontSize - 1 : 1);

  return (
    <DataProvider>
      <div className="app-container">
        <div className="calendar-and-controls">
          <ControlButtons          
            handleCalendarVisibility={toggleCalendarVisibility}
            isCalendarVisible={isCalendarVisible}
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
          />
          <CustomDatePicker 
            isCalendarVisible={isCalendarVisible} 
            setIsCalendarVisible={setIsCalendarVisible}
            customHeight={calendarHeight} 
          />
          </div>
          <div className="content-area">
            <Sidebar customHeight={sidebarHeight}/>
            <div className={`data-display-area ${isCalendarVisible ? 'small' : 'large'}`}
               style={{ maxHeight: dataAreaHeight }}>
              <ShowRawData 
                fontSize={fontSize}
                customHeight={dataAreaHeight}/>
          </div>
        </div>
      </div>
    </DataProvider>
  );  
};
