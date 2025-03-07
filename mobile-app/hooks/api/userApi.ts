import axiosInstance from "./axiosInstance";

// Function to fetch all users data
export const loginRequest = async (payload: any) => {
  const response = await axiosInstance.post(`/auth/login`, payload, {
    withCredentials: true,
  });
  return response.data || response; // Assuming the response contains the data
};

// Function to fetch register users
export const signupRequest = async (payload: any) => {
  const response = await axiosInstance.post(`/auth/signup`, payload);
  return response.data || response; // Assuming the response contains the data
};

// Function to fetch register users
export const sendOtpMail = async (payload: any) => {
  const response = await axiosInstance.post(`/auth/send-otp-email`, payload);
  return response.data || response; // Assuming the response contains the data
};

// Function to fetch register users
export const getAllTasks = async () => {
  const response = await axiosInstance.get(`/task/all-tasks`);
  return response.data || response; // Assuming the response contains the data
};

// Function to fetch register users
export const createNewTaksRequest = async (payload: any) => {
  const response = await axiosInstance.post(`/task/create`, payload);
  return response.data || response; // Assuming the response contains the data
};

// Function to fetch register users
export const updateTaksRequest = async (payload: any) => {
  const response = await axiosInstance.put(`/task/update/${payload?._id}`, {
    title: payload?.title,
    description: payload?.description,
  });
  return response.data || response; // Assuming the response contains the data
};

// Function to fetch register users
export const deleteTaksRequest = async (payload: any) => {
  const response = await axiosInstance.delete(`/task/delete/${payload?._id}`);
  return response.data || response; // Assuming the response contains the data
};
