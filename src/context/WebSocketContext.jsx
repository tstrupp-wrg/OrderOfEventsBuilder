import React, { createContext, useContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import config from "../api/config";

const endpoint = config.dev;
const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const socket = socketIOClient(endpoint);

    socket.on("update", (data) => {
      console.log(data);
      setMessage(data);
    });

    return () => {
      socket.off("message"); // Remove listener
      socket.disconnect();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={message}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
