import logo from './logo.svg';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import './App.css';
import EmployeeManagmentApp from './components/EmployeeManagmentApp';
import EmployeeDetails from './components/EmployeeDetails';

function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Navigate to="employee"/>}/>
      <Route path='/employee' element={<EmployeeManagmentApp/>}/>
      <Route path='/employee/:id' element={<EmployeeDetails/>}/>
     </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
