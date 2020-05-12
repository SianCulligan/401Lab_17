'use strict';

const net = require('net');
const server = net.createServer();

let socketPool = [];
let port = process.env.PORT || 3000;

//DONE needs to be up first so that it can accept socket connections
server.listen(port, () => {
  console.log('Server is up & running on port', port);
});


//DONE create a pool of connected sockets and read incoming data from a single socket, broadcasting that information back to all connected sockets.
//check npm net for different events
server.on('connection', socket => {
  //socket pool
  socketPool.push(socket);
  console.log('Received connection from', socket.address());

  socket.on('data', (payload) => {
    console.log(JSON.parse(Buffer.from(payload.id).toString()));

    //send something to complete pool
    for(let i = 0; i < socketPool.length; i++) {
      socket.write('picked up order', payload.id);
    }
    if (socketPool.length > 0) {
      //send something to single socket
      // Writes ONE!!! to driver,js console
      socketPool[0].write(`ONE!!!`); 
    }
    // Writes TWO@@@ to vendor.js console
    if (socketPool.length === 2) {
      socketPool[1].write(`TWO@@@`); 
    }
  });
});
