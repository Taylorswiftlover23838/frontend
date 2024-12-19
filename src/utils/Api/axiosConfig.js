import axios from "axios";
import useAuthStore from "../ZustandStore/useAuthStore";

const api = axios.create({
  baseURL: "http://localhost:8020",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshToken = async () => {
  try {
    const response = await api.post("/refreshtoken");
    console.log("refreshing token");
    const newAccessToken = response.data.accessToken;
    return newAccessToken;
  } catch (error) {
    console.error("Token refresh failed:", error);
    useAuthStore.getState().clearAccessToken();
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;

    if (
      response.status === 403 ||
      response.data.message === "Invalid access token"
    ) {
      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        useAuthStore.getState().setAccessToken(newAccessToken);
        console.log(newAccessToken);
        return axios(error.config);
      }
    }

    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;