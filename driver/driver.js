'use strict';

// needs to be up second so that it can connect to the socket server and await orders created from the vendor

//act as a TCP Socket Connection to the CSPS Socket server.

// FOLLOW THIS PROCESS: 
// Connect to the CSPS Socket Server
// Listen for the data event from the CSPS Socket Server. When you hear that event, look at the payload sent and parse it. If it has a property event equal to pickup, then simulate picking up the package
//Wait one second
//Log picked up order # to the console
//Create an object with key values event equal to in-transit and payload equal to the order object you received.
//Send that object to the server

//kick off the delivery simulation

//FOLLOW THIS PROCESS:
//Wait three seconds
//Log delivered order # to the console
//Create an object with key values event equal to delivered and payload equal to the order object you received.
//Send that object to the server

const faker = require('faker');
const net = require('net');
const socket = net.Socket();
        
socket.connect({port: 3000, host: 'localhost'}, () => {
  console.log(`Driver is now connected to TCP Socket Server!`);
});

//this prints "Picked up order ###" to driver.js
socket.on('data', payload =>  {
  let stringPayload = Buffer.from(payload).toString();
  let jsonPayload = {};
  try {
    jsonPayload = JSON.parse(stringPayload);
  } catch (e) {
    jsonPayload = {};
  }
  if (jsonPayload.event === 'pickup') {
    console.log('picked up order ', JSON.parse(Buffer.from(payload).toString()).content); 
  } else {
    console.log('PICKED UP', stringPayload);
  }
});


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// This prints delivery noifications on server.js console
setInterval(() => {
  let order = getRandomInt(10000);
  socket.write(JSON.stringify({event: 'delivered order', content:  order  }));
}, 4000);