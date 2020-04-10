import React, { useState, useEffect } from 'react';
import Sockt from './Socket';
import Socket from './Components/socket';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

//const SocketIO = require('socket.io-client');
//const socket = SocketIO('http://localhost:6000');
//const SerialPort = require('serialport');
/*const ReadLine = SerialPort.parsers.Readline;

const port = new SerialPort("COM5", {
  baudRate: 115200
});
const parser = port.pipe(new ReadLine({ delimiter: '\n' }));*/










function App() {

  function LedON(){

    axios.post(`http://localhost:6000/led/on`, "")
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  function LedOFF(){

    axios.post(`http://localhost:6000/led/off`, "")
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }




  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={LedON}>Led ON</button>
        <button onClick={LedOFF}>Led OFF</button>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React


          <Sockt
        serverUrl="http://localhost:6000/"
        topic="temperature"
        />
        <Socket
        serverUrl="http://localhost:6000/"
        topic="temperature"
        />
        </a>
      </header>
    </div>
  );
}

export default App;
