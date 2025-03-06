import axiosInstance from "./axiosInstance";

// Function to fetch all users data
export const loginRequest = async (payload: any) => {
  const response = await axiosInstance.post(`/auth/login`, payload, {
    withCredentials: true,
  });
  return response.data || response; // Assuming the response contains the data
};

// Function to fetch register users
export const signup = async (payload: any) => {
  const response = await axiosInstance.post(`/auth/signup`, payload);
  return response.data || response; // Assuming the response contains the data
};
