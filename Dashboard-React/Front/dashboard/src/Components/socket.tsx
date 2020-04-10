import React, { useState, useEffect,SetStateAction } from 'react';
import PropTypes from "prop-types";
import SocketIO from "socket.io-client";
import { strict } from "assert";

const useSocket = (serverUrl:any, topic:any) => {
  const [temp, setTemp] = useState(0);
  const [isConnected, setConnected] = useState(false);

  const client = SocketIO.connect(serverUrl);
  client.on("connect", () => setConnected(true));
  client.on("disconnect", () => setConnected(false));

  useEffect(() => {
    client.on(topic, (data: SetStateAction<number>) => {
      setTemp(data);
    });
  }, [topic, client]);

  return { temp, isConnected };
};


function Socket (serverUrl:any, topic:any ) {
  const { temp, isConnected } = useSocket(serverUrl, topic);

  useEffect(() => {
    //useSocket(serverUrl, topic);
  }, []);

  return (
    <div>
      <h4>Temperature</h4>
      <h1>{temp}</h1>
      <h3>{`CONNECTED: ${isConnected}`}</h3>
    </div>
  )
}

Socket.propTypes = {
  serverUrl: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired
};

export default Socket;