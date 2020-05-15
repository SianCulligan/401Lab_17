'use strict';

const faker = require('faker');
const net = require('net');
const socket = net.Socket();

socket.connect({port: 3000, host: 'localhost'}, () => {
    console.log(`It's happening! Connected to TCP Socket Server!`);
});

socket.on('data', (payload) => {
  let parsed = JSON.parse(payload.toString());
    console.log('vendor now has ', parsed);
  if(parsed.event === 'delivered') {
  console.log('Thank you for delivering', parsed.order.id)
  }
});

setInterval(() => {
  // get path from npm faker
    let order = {
      store: faker.company.companyName(),
      id: faker.random.uuid(),
      time: faker.date.recent(),
      name: faker.name.firstName() + ' ' + faker.name.lastName(),
      street: faker.address.streetAddress() + ', ' + faker.address.city() + ', ' + faker.address.state(),
    };
//this will trigger a data event - payload (Similar to socket.emit('write',...))
    socket.write(JSON.stringify({event: 'pickup', order: order}));
}, 5000);   
