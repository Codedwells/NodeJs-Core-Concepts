# Streams

There are three types of streams:

- Readable Streams
- Writable Steams
- Duplex Streams
- Transform Streams


## Important methods

```js

    const stream = myFile.createWriteStream();
    stream.writableHighWaterMark // Shows maximum size of a buffer

    stream.writableLength // Shows how much of the buffer is filled

```