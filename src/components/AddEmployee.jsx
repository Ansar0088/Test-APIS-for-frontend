import React, { useEffect, useState } from "react";
import { CreateEmployees, UpdateEmployeesById } from "../api/api";
import { toast } from "react-toastify";

const AddEmployee = ({ showModal, setShowModal, fetchEmployees, updateEmpObj }) => {
  const [employee, setEmployee] = useState({
    name: "",
    phone: "",
    email: "",
    salary: "",
    department: "",
    profileImage: null,
  });

  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    if (updateEmpObj) {
      setUpdateMode(true);
      setEmployee(updateEmpObj);
    } else {
      setUpdateMode(false);
      resetEmployeeState();
    }
  }, [updateEmpObj]);

  const resetEmployeeState = () => {
    setEmployee({
      name: "",
      phone: "",
      email: "",
      salary: "",
      department: "",
      profileImage: null,
    });
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleFileChange = (e) => {
    setEmployee({ ...employee, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = updateMode
        ? await UpdateEmployeesById(employee, employee._id)
        : await CreateEmployees(employee);

      const { success, message } = response;
      if (success) {
        toast.success(updateMode ? "Employee updated successfully!" : "Employee added successfully!");
        setShowModal(false);
        resetEmployeeState();
        fetchEmployees();
      } else {
        toast.error(message || "Failed to process employee.");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className={`modal fade ${showModal ? "show d-block" : "d-none"}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered py-0" role="document">
        <div className="modal-content">
          <div className="modal-header p-3">
            <h5 className="modal-title">{updateMode ? "Update Employee" : "Add Employee"}</h5>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-1">
                <label htmlFor="employeeName" className="form-label">Name</label>
                <input
                  type="text"
                  value={employee.name}
                  className="form-control"
                  name="name"
                  onChange={handleChange}
                  required
                  placeholder="Enter name"
                />
              </div>
              <div className="mb-1">
                <label htmlFor="employeeEmail" className="form-label">Email</label>
                <input
                  type="email"
                  value={employee.email}
                  className="form-control"
                  name="email"
                  onChange={handleChange}
                  required
                  placeholder="Enter email"
                />
              </div>
              <div className="mb-1">
                <label htmlFor="employeePhone" className="form-label">Phone</label>
                <input
                  type="number"
                  value={employee.phone}
                  className="form-control"
                  name="phone"
                  onChange={handleChange}
                  required
                  placeholder="Enter phone number"
                />
              </div>
              <div className="mb-1">
                <label htmlFor="employeeSalary" className="form-label">Salary</label>
                <input
                  type="number"
                  className="form-control"
                  value={employee.salary}
                  name="salary"
                  onChange={handleChange}
                  required
                  placeholder="Enter salary"
                />
              </div>
              <div className="mb-1">
                <label htmlFor="employeeDepartment" className="form-label">Department</label>
                <input
                  type="text"
                  className="form-control"
                  value={employee.department}
                  name="department"
                  onChange={handleChange}
                  required
                  placeholder="Enter department"
                />
              </div>
              <div className="mb-1">
                <label htmlFor="employeeProfileImage" className="form-label">Profile Image</label>
                <input
                  type="file"
                  className="form-control"
                  name="profileImage"
                  onChange={handleFileChange}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                <button type="submit" className="btn btn-primary">
                  {updateMode ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
