'use strict';

const EventEmitter = require('events');
// only one emitter per app
const emitter = new EventEmitter();

module.exports = emitter;
