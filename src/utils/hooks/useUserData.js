import { useQuery}from "@tanstack/react-query";
import api from "../Api/axiosConfig";

const fetchUserData = async () => {
  const response = await api.get("/account/data/userData");
  return response.data.userData;
};

const useUserData = (loggedIn) => {
  const { data, ...rest } = useQuery({
    queryKey: ["userData"],
    queryFn: fetchUserData,
    enabled: loggedIn,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { data, ...rest };
};

export default useUserData;
