class EventEmitter {
    listeners = {};

    addListener(eventName, fn) {
        this.listeners[eventName] = this.listeners[eventName] || [];

        this.listeners[eventName].push(fn);
    }

    removeListener(eventName) {
        let lis = this.listeners[eventName];
        if (!lis) return this;

        delete this.listeners[eventName];
    }

    listenersCount(eventName) {
        return this.listeners[eventName].length;
    }

    rawListeners(eventName) {
        return this.listeners[eventName];
    }

    on(eventName, fn) {
        this.addListener(eventName, fn);
    }

    once(eventName, fn) {
        this.listeners[eventName] = this.listeners[eventName] || [];
        const onceWrapper = () => {
            fn();

            this.off(eventName);
        };
        this.listeners[eventName].push(onceWrapper);
    }

    off(eventName) {
        this.removeListener(eventName);
    }

    emit(eventName, ...args) {
        let lis = this.listeners[eventName];

        if (!lis) return false;

        lis.forEach((fn) => {
            fn(...args);
        });
    }
}

const e = new EventEmitter();

e.on('foo', () => {
    console.log('Foo occured');
});

e.on('foo', () => {
    console.log('Foo occured2');
});
e.on('bar', () => {
    console.log('bar occured3');
});

e.emit('foo');
e.emit('bar');
e.off('bar');
e.emit('bar');
