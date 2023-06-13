import EventEmitter from 'events';

class Emitter extends EventEmitter {}

const e = new Emitter();

e.on('foo', () => {
    console.log('Foo occured');
});
e.on('foo', () => {
    console.log('Foo occured2');
});
e.on('foo', () => {
    console.log('Foo occured3');
});

e.emit('foo');
