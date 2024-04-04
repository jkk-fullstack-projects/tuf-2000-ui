"use client";

import { DataProvider } from "../context/DataContext";
import CustomDatePicker from "./components/CustomDatePicker/CustomDatePicker";
import Sidebar from "./components/Sidebar/Sidebar";
import ShowRawData from "./components/ShowRawData/ShowRawData";
export default function Home() {
  return (
    <DataProvider>
      <CustomDatePicker />
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <ShowRawData />
          </div>
      </div>
    </DataProvider>
  );  
};
