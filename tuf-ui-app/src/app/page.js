"use client";
import { DataProvider } from "../context/DataContext";
import Sidebar from "./components/Sidebar/Sidebar";
export default function Home() {
  return (
    <DataProvider>
      <div>Hello World</div>
      <Sidebar />
    </DataProvider>
  );  
};
