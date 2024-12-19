import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { onMessage, offMessage } from '../socket'; // Import from socket.js
import api from "../Api/axiosConfig";

const fetchUserData = async () => {
  const response = await api.get('/userData');
  return response.data.userData;
};

const useUserData = (loggedIn) => {
  const queryClient = useQueryClient();

  // Fetch user data using React Query
  const { data, ...rest } = useQuery({
    queryKey: ["userData"],
    queryFn: fetchUserData,
    enabled: loggedIn, 
    refetchOnWindowFocus: false, 
    refetchOnMount: false, 
  });

  // WebSocket setup to listen for real-time updates
  useEffect(() => {
    if (!loggedIn) return;

    const handleUserDataUpdate = (newBalance) => {
      queryClient.setQueryData(["userData"], (prevData) => ({
        ...prevData,
        balance: newBalance, // Update only the balance field
      }));
    };

    // Listen for user data updates via WebSocket
    onMessage('userDataUpdate', handleUserDataUpdate);

    return () => {
      offMessage('userDataUpdate'); // Cleanup WebSocket listener
    };
  }, [loggedIn, queryClient]);

  return { data, ...rest };
};

export default useUserData;