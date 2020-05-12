'use strict';

// 1. define handler
// 2. attach handlers with listener - liten to pickup,  
// 3. Raise /emit events - emit in transit & emit delivered


const globalEmitter = require('./events.js');
const pickup = require ('./handler.js').driverPickupHandler;
const delivery = require('./handler.js').driverDeliveredHandler;

const outForDelivery = (payload) => {
  globalEmitter.emit('in-transit', payload);
  setTimeout (() => {
    globalEmitter.emit('delivered', payload);
  }, 1000);
};

globalEmitter.on('pickup', pickup);
globalEmitter.on('pickup', outForDelivery);
globalEmitter.on('delivered', delivery);
