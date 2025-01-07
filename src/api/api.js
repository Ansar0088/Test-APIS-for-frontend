const BASE_URL = "http://localhost:2025";

export const GetAllEmployees = async (search = "", page = 1, limit = 5) => {
  const url = `${BASE_URL}/api/employees?search=${search}&page=${page}&limit=${limit}`;
  try {
    const options = {
      method: "GET",
      "content-Type": "application/json",
    };
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};


export const CreateEmployees = async (empobj) => {
  const url = `${BASE_URL}/api/employees`;
  try {

    const formData= new FormData();

    for(const key in empobj){
     formData.append(key, empobj[key])
    }
    const options = {
      method: "POST",
      "content-Type": "application/json",
      body:formData
    };
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const UpdateEmployeesById = async (empObj,id) => {
  const url = `${BASE_URL}/api/employees/${id}`;
  try {

    const formData= new FormData();

    for(const key in empObj){
     formData.append(key, empObj[key])
    }
    const options = {
      method: "PUT",
      "content-Type": "application/json",
      body:formData
    };
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};


export const DeleteEmployeeById = async (id) => {
  const url = `${BASE_URL}/api/employees/${id}`;
  try {
    const options = {
      method: "DELETE",
      "content-Type": "application/json",
    };
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};



export const GetEmployeeById = async (id) => {
  const url = `${BASE_URL}/api/employees/${id}`;
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("API fetch error:", err);
    throw err; 
  }
};



