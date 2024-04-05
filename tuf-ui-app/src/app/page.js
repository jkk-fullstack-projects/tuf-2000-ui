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
      <Sidebar />
      <div className="main-content">
        <CustomDatePicker 
          isCalendarVisible={isCalendarVisible} 
          setIsCalendarVisible={setIsCalendarVisible} 
        />
        <div className={`data-display-area ${isCalendarVisible ? 'small' : 'large'}`}>
          <ShowRawData />
        </div>
      </div>
    </div>
    </DataProvider>
  );  
};
