"use client";

import React, { useState } from "react";
import { DataProvider } from "../context/DataContext";
import CustomDatePicker from "./components/CustomDatePicker/CustomDatePicker";
import Sidebar from "./components/Sidebar/Sidebar";
import ShowRawData from "./components/ShowRawData/ShowRawData";

export default function Home() {
  const [isCalendarVisible, setIsCalendarVisible] = useState(true);

  return (
    <DataProvider>
      <div className="app-container">
        <div className="calendar-and-sidebar">
          <CustomDatePicker 
            isCalendarVisible={isCalendarVisible} 
            setIsCalendarVisible={setIsCalendarVisible} 
          />
          <Sidebar />
        
          <div className={`data-display-area ${isCalendarVisible ? 'small' : 'large'}`}>
            <ShowRawData />
          </div>
        </div>
      </div>
    </DataProvider>
  );  
};
