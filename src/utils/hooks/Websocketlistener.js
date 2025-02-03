import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { onMessage, offMessage } from "../socket";

const WebSocketListener = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleUserDataUpdate = ({ updatedFields }) => {
      if (!updatedFields) return;

      queryClient.setQueryData(["userData"], (prevData) => ({
        ...prevData,
        ...updatedFields,
      }));
    };

    onMessage("userDataUpdate", handleUserDataUpdate);

    return () => {
      offMessage("userDataUpdate", handleUserDataUpdate);
    };
  }, [queryClient]);
};

export default WebSocketListener;
