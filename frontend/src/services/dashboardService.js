import api from "../api/axiosInstance";

export const fetchDashboard = async () => {
  const response = await api.get("/dashboard");
  return response.data;
};
