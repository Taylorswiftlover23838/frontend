import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { onMessage, offMessage } from '../socket'; 
import api from "../Api/axiosConfig";

const fetchUserData = async () => {
  const response = await api.get('/account/data/userData');
  return response.data.userData;
};

const useUserData = (loggedIn) => {
  const queryClient = useQueryClient();
  const { data, ...rest } = useQuery({
    queryKey: ["userData"],
    queryFn: fetchUserData,
    enabled: loggedIn, 
    refetchOnWindowFocus: false, 
    refetchOnMount: false, 
  });

  useEffect(() => {
    if (!loggedIn) return;

    const handleUserDataUpdate = (newBalance) => {
      queryClient.setQueryData(["userData"], (prevData) => ({
        ...prevData,
        balance: newBalance, 
      }));
    };

    onMessage('userDataUpdate', handleUserDataUpdate);

    return () => {
      offMessage('userDataUpdate'); 
    };
  }, [loggedIn, queryClient]);

  return { data, ...rest };
};

export default useUserData;