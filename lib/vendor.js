'use strict';


const globalEmitter = require('./events.js');
const faker = require('faker');
const handler = require('./handler.js');


globalEmitter.on('delivered', handler);


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

setInterval(() => {
// get path from npm faker
  let customer = {
    store: faker.company.companyName(),
    id: getRandomInt(10000),
    time: faker.date.recent(),
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    street: faker.address.streetAddress() + ', ' + faker.address.city() + ', ' + faker.address.state(),
  };
  globalEmitter.emit('pickup', { customer }); }, 5000);
