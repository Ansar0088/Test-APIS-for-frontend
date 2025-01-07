import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetEmployeeById } from '../api/api'; 
import { toast } from 'react-toastify';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
   const navigate=useNavigate()
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const { data } = await GetEmployeeById(id);
        setEmployee(data);
        console.log('-------id',data)
      } catch (err) {
        toast.error('Failed to fetch employee details.');
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!employee) {
    return <div className='border'>No Employee Found
      <button onClick={()=>navigate('/employee')}>back</button>
    </div>;  
  }

  return (
    <div className="container mt-5">
      <h2>Employee Details</h2>
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">{employee.name}</h5>
          <p className="card-text">
            <strong>Email:</strong> {employee.email}
          </p>
          <p className="card-text">
            <strong>Phone:</strong> {employee.phone}
          </p>
          <p className="card-text">
            <strong>Salary:</strong> ${employee.salary}
          </p>
          <p className="card-text">
            <strong>Department:</strong> {employee.department}
          </p>
          {employee.profileImage && (
            <img
              src={employee.profileImage}
              alt={`${employee.name}'s profile`}
              className="img-fluid rounded"
              style={{ maxWidth: '200px' }}
            />
          )}
         
        </div>
      </div>
   

    </div>
  );
};

export default EmployeeDetails;
