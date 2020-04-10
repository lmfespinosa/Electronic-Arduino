const http = require('http');
const express = require('express');
const SocketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = SocketIO.listen(server);

app.use(express.static(__dirname + '/public'));
server.listen(6000, () => console.log('server on port 3000'));

const SerialPort = require('serialport');
const ReadLine = SerialPort.parsers.Readline;

const port = new SerialPort("COM5", {
  baudRate: 115200
});
const parser = port.pipe(new ReadLine({ delimiter: '\n' }));

parser.on('open', function () {
  console.log('connection is opened');
});

parser.on('data', function (data) {
  if(data.includes("TEMP")){
    let temp = parseInt(data.split(":")[1], 10) + " °C";
    console.log(temp);
    io.emit('temperature', data.toString());
  }
   if(data.includes("HUM")){
    let temp = parseInt(data.split(":")[1], 10) + " %";
    console.log(temp);
    io.emit('humidity', data.toString());
  }
});

parser.on('error', (err) => console.log(err));
port.on('error', (err) => console.log(err));



app.post('/led/:action', function (req, res) {
    
    var action = req.params.action || req.param('action');
     
     if(action == 'on'){
        port.write("LED_ON\n");
         //return res.send('Led light is on!');
     } 
     if(action == 'off') {
        port.write("LED_OFF\n");
         //return res.send("Led light is off!");
     }
     
     //Sreturn res.send('Action: ' + action);
  
 });
