import React from "react";
import PropTypes from "prop-types";
import socket from "socket.io-client";

const useSocket = (serverUrl, topic) => {
  const [temp, setTemp] = React.useState(0);
  const [isConnected, setConnected] = React.useState(false);

  const client = socket.connect(serverUrl);
  client.on("connect", () => setConnected(true));
  client.on("disconnect", () => setConnected(false));

  React.useEffect(() => {
    client.on(topic, data => {
      setTemp(data);
    });
  }, [topic, client]);

  return { temp, isConnected };
};

const Sockt = ({ serverUrl, topic }) => {
  const { temp, isConnected } = useSocket(serverUrl, topic);

  return (
    <div>
      <h4>Temperature</h4>
      <h1>{temp}</h1>
      <h3>{`CONNECTED: ${isConnected}`}</h3>
    </div>
  );
};

Sockt.propTypes = {
  serverUrl: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired
};

export default Sockt;