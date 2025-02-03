import { useEffect, useState } from "react";
import { onMessage, offMessage } from "../socket";

const useBalanceNotification = () => {
  const [notificationQueue, setNotificationQueue] = useState([]);
  const [currentNotification, setCurrentNotification] = useState(null);

  useEffect(() => {
    const handleNotificationUpdate = ({ notification }) => {
      setNotificationQueue((prevQueue) => [...prevQueue, notification.amount]);
    };

    onMessage("notificationUpdate", handleNotificationUpdate);

    return () => {
      offMessage("notificationUpdate", handleNotificationUpdate);
    };
  }, []);

  useEffect(() => {
    if (notificationQueue.length > 0 && !currentNotification) {
      setCurrentNotification(notificationQueue[0]);
      setNotificationQueue((prevQueue) => prevQueue.slice(1));
    }
  }, [notificationQueue, currentNotification]);

  useEffect(() => {
    if (currentNotification > 0) {
      const audio = new Audio("/Audios/balance_went_up.wav"); 
      audio.play();
    }

    if (currentNotification) {
      const timer = setTimeout(() => {
        setCurrentNotification(null);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [currentNotification]); 

  return currentNotification;
};

export default useBalanceNotification;
