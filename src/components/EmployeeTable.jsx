import React from "react";
import { Link } from "react-router-dom";

const EmployeeTable = ({
  employees = [],
  pagination,
  fetchEmployees,
  handleUpdateEmployee,
  handleDeleteEmployee,
}) => {
  const header = ["Name", "Email", "Phone", "Department", "Actions"];

  const { currentPage, totalPages } = pagination;

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePagination(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePagination(currentPage - 1);
    }
  };

  const handlePagination = (currentPage) => {
    fetchEmployees("", currentPage, 5);
  };
  const TableRow = ({ employee }) => {
    return (
      <tr>
        <td>
          <Link
            to={`/employee/${employee._id}`}
            className="text-decoration-none"
          >
            {employee.name}
          </Link>
        </td>
        <td>{employee.email}</td>
        <td>{employee.phone}</td>
        <td>{employee.department}</td>
        <td>
          <i
            className="bi bi-pencil-fill text-warning me-3"
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Edit"
            onClick={() => handleUpdateEmployee(employee)}
          ></i>
          <i
            className="bi bi-trash-fill text-danger"
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Delete"
            onClick={() => handleDeleteEmployee(employee)}
          ></i>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            {header.map((headerItem, i) => (
              <th key={i}>{headerItem}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => <TableRow key={emp.id} employee={emp} />)
          ) : (
            <tr>
              <td colSpan={header.length}>No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-between alifn-items-center my-3">
        <span className="badge bg-primary">
          page{currentPage}of{totalPages}
        </span>
        <div>
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => handlePreviousPage()}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {pageNumbers.map((page) => {
            return (
              <>
                <button
                  onClick={() => handlePagination(page)}
                  className={`btn btn-outline-primary me-1 ${
                    currentPage === page ? "active" : ""
                  }`}
                >
                  {page}
                </button>
              </>
            );
          })}
          <button
            className="btn btn-outline-primary ms-2"
            onClick={() => handleNextPage()}
            p
            disabled={totalPages === currentPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
