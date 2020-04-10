const socket = io();

const temperatureDisplay = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
socket.on('temperature', function (data) {
  console.log(data);
  temperature.innerHTML = `${data}°C`;
});

socket.on('humidity', function (data) {
  console.log(data);
  humidity.innerHTML = `${data}%`;
});

function Led_ON() {

  fetch('led/on', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        user: {
            name: "John",
            email: "john@example.com"
        }
    })
});
  console.log("this is running!")

}

function Led_OFF() {

  fetch('led/off', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        user: {
            name: "John",
            email: "john@example.com"
        }
    })
});
  console.log("this is running!")

}


