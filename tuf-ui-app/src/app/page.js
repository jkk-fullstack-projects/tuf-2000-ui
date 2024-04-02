"use client";
import { DataProvider } from "../context/DataContext";
import Sidebar from "./components/Sidebar/Sidebar";
import ShowRawData from "./components/ShowRawData/ShowRawData";
import DataFetcher from "./components/DataFetcher/DataFetcher";
export default function Home() {
  return (
    <DataProvider>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <DataFetcher />
          <ShowRawData />
        </div>
      </div>
    </DataProvider>
  );  
};
