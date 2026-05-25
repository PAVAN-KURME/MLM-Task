import api from "../api/axiosInstance";

export const fetchReferralTree = async () => {
  const response = await api.get("/referrals/tree");
  return response.data;
};
