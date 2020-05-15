'use strict';

const net = require('net');
const server = net.createServer();

let socketPool = [];
let port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server is up & running on port', port);
});

const logger = (payload) => {
  // console.log('got', JSON.parse(payload.toString()));
  let parsed = JSON.parse(payload.toString());
  for(let i = 0; i < socketPool.length; i++) {
    let socket = socketPool[i];
    socket.write(payload);
  }
  
  if(parsed.event === 'pickup') {
    console.log('pickup');
    console.log('- Time: ', new Date());
    console.log('- Store: ', parsed.order.store);
    console.log('- Order ID: ', parsed.order.id);
    console.log('- Customer: ', parsed.order.name);
    console.log('- Address: ', parsed.order.address);
  }

  if (parsed.event === 'in-transit') {
    console.log('In transid, order ', parsed.order.id);
  }
  if (parsed.event === 'Delivered') {
    console.log('Delivered order ', parsed.order.id);
  }
};

server.on('connection', (socket) => {
  //socket pool
  console.log('Received connection from', socket.address());
  socketPool.push(socket);
  socket.on('data', (logger));
});
