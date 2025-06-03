import { createContext, useContext, useEffect, useState } from 'react';
import { socket } from '../util/socket';

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const handleConnect = () => {
      console.log('✅ Connected to server');
      setIsConnected(true);
    };

    const handleDisconnect = (reason) => {
      console.log('❌ Disconnected from server. Reason:', reason);
      setIsConnected(false);
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    // Clean up event listeners, NOT the socket itself
    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
