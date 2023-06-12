import EventEmitter from 'events';

class Emitter extends EventEmitter {}

const e = new Emitter();

e.on('foo', () => {
    console.log('Foo occured');
});

e.emit('foo');
