"use client";

import React, { useEffect, useState } from 'react';
import { DataProvider } from '../context/DataContext';
import ControlButtons from './components/ControlButtons/ControlButtons';
import CustomDatePicker from './components/CustomDatePicker/CustomDatePicker';
import Sidebar from './components/Sidebar/Sidebar';
import ShowRawData from './components/ShowRawData/ShowRawData';

/**
 * The Home component serves as the main entry point for the TUF-2000M measurement data display application.
 * It orchestrates the layout and interaction between the calendar, sidebar, and data display components.
 * 
 * @component
 * @example
 * return <Home />;
 */

export default function Home() {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [fontSize, setFontSize] = useState(14);

  const [sidebarHeight, setSidebarHeight] = useState("50vh");
  const [dataAreaHeight, setDataAreaHeight] = useState("50vh");
  const [calendarHeight, setCalendarHeight] = useState("50vh");

  /**
   * Adjusts the height of sidebar and data display area based on calendar visibility.
   */
  useEffect(() => {
    if (!isCalendarVisible) {
        // Reduce the heights to accommodate the calendar being visible or not
        setSidebarHeight("90vh");
        setDataAreaHeight("90vh");
    } else {
        setSidebarHeight("50vh");
        setDataAreaHeight("50vh");
        setCalendarHeight("80vh");
    }
  }, [isCalendarVisible]);

  /**
   * Toggles the visibility of the calendar view.
   */
  const toggleCalendarVisibility = () => {
    console.log("Calendar visibility toggling to:", !isCalendarVisible);
    setIsCalendarVisible(!isCalendarVisible);
  };

  /**
   * Increases the font size for the data display area.
   */
  const increaseFontSize = () => setFontSize(fontSize + 1);

  /**
   * Decreases the font size for the data display area, with a minimum limit.
   */
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
