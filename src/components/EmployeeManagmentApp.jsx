import React, { useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import { DeleteEmployeeById, GetAllEmployees } from "../api/api";
import AddEmployee from "./AddEmployee";
import { toast, ToastContainer } from "react-toastify";

const EmployeeManagmentApp = () => {
  const [showModal, setShowModal] = useState(false);
  const [updateEmpObj, setUpdateEmpObj] = useState(null);

  const [employeeData, setEmployeeData] = useState({
    employee: [],
    pagination: {
      countTotalEmployees: 0,
      totalPages: 1,
      pageSize: 5,
    },
  });

  const fetchEmployees = async (search = "", page = 1, limit = 5) => {
    try {
      const { data } = await GetAllEmployees(search, page, limit);
      setEmployeeData({
        employee: data.employees,
        pagination: data.pagination,
      });
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleUpdateEmployee = (empObj) => {
    setUpdateEmpObj(empObj);
    setShowModal(true);
  };

  const handleDeleteEmployee = async (emp) => {
    try {
      const { success, message } = await DeleteEmployeeById(emp._id);
      if (success) {
        toast.success("Employee Deleted!");
        fetchEmployees()
      } else {
        toast.error(message || "Failed to delete employee");
      }
    } catch (err) {
      toast.error("Failed to delete employee. Please try again.");
    }
  };

const handleSearch=(e)=>{
  const term=e.target.value;
  fetchEmployees(term)
}
  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-3">
      <h1>Employee Management App</h1>
      <div className="d-flex justify-content-center w-100">
        <div className="w-80 border bg-light p-3" style={{ width: "80%" }}>
          <div className="d-flex justify-content-between mb-3">
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              Add
            </button>
            <input
              type="text"
              onChange={handleSearch}
              placeholder="Search Employee..."
              className="form-control w-50"
            />
          </div>
          <EmployeeTable
            handleDeleteEmployee={handleDeleteEmployee}
            handleUpdateEmployee={handleUpdateEmployee}
            fetchEmployees={fetchEmployees}
            employees={employeeData.employee}
            pagination={employeeData.pagination}
          />
          <AddEmployee
            updateEmpObj={updateEmpObj}
            fetchEmployees={fetchEmployees}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmployeeManagmentApp;
