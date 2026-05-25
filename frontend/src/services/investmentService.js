import api from "../api/axiosInstance";

export const fetchInvestments = async () => {
  const response = await api.get("/investments/my-investments");
  return response.data;
};

export const createInvestment = async (payload) => {
  const response = await api.post("/investments/create", payload);
  return response.data;
};
