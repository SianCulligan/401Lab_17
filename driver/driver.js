'use strict';

const net = require('net');
const socket = new net.Socket();

socket.connect({port: 3000, host: 'localhost'}, () => {
  console.log(`Driver is now connected to TCP Socket Server!`);
});


//this prints "Picked up order ###" to driver.js
socket.on('data', (payload) =>  {
// console.log('got', JSON.parse(payload.toString()));
  let parsed = JSON.parse(payload.toString());

  if (parsed.event === 'pickup'){
    setTimeout(() => {
      let newPayload = { event: 'in-transit', order: parsed.order };
      console.log('Picked up order ', parsed.order.id);
      socket.write(JSON.stringify(newPayload));
    }, 1000);
  }

  if (parsed.event === 'in-transit') {
    setTimeout (() => {
      let newPayload = { event: 'delivered', order: parsed.order };
      console.log('Delivered order', parsed.order.id);
      socket.write(JSON.stringify(newPayload));
    }, 3000);
  }});