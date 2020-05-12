'use strict';

//needs to be up third so that it can connect to the socket server and start creating orders that the driver can respond to

//will act as a TCP Socket Connection to the CSPS Socket Server

//FOLLOW THIS PROCESS: 

// Connect to the CSPS Socket Server
// Every 5 seconds, a new customer order will be randomly generated. This order should have a store name, order id, customer name and address. 
//DONE Use the faker package to help generate random values.
// When a new customer order is generated, create an object with key values event set to pickup and payload set to the customer order object.
// Send this {event, payload} object to the CSPS Socket Server
// Listen for the data event from the CSPS Socket Server. When you hear that event, look at the payload sent and parse it. If it has property event equal to delivered
//log a thank you message to the console. Ignore all other events.


const faker = require('faker');
const net = require('net');
const socket = net.Socket();

socket.connect({port: 3000, host: 'localhost'}, () => {
    console.log(`It's happening! Connected to TCP Socket Server!`);
});

socket.on('data', payload =>  {
    let stringPayload = Buffer.from(payload).toString();
    let jsonPayload = {};
  
    try {
      jsonPayload = JSON.parse(stringPayload);
    } catch (e) {
      jsonPayload = {};
    }
  
    if (jsonPayload.event === 'shout') {
      console.log('I shout ** ', JSON.parse(Buffer.from(payload).toString()).content); 
    } else {
      console.log(stringPayload);
    }
  });

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

//set a random word to be generated every 2 seconds
// CHANGE TO ORDER EVERY 5
setInterval(() => {
      // get path from npm faker
        let customer = {
          store: faker.company.companyName(),
          id: getRandomInt(10000),
          time: faker.date.recent(),
          name: faker.name.firstName() + ' ' + faker.name.lastName(),
          street: faker.address.streetAddress() + ', ' + faker.address.city() + ', ' + faker.address.state(),
        };
    //this is the payload (Similar to socket.emit('write',...))
    
        socket.write(JSON.stringify({event: 'pickup', content: customer}));
}, 5000);        

       









