# fs Module is used in node to interact with the File System

It uses libUv under the hood to perform sys call to make handle files

## There are three apis

- [Asynchronous API](#asynchronous-api)
- [Callback API](#callback-api)
- [Synchronous API](#synchronous-api)

### Asynchronous API

We get the fs module from ``fs/promises``

```js
import fs from 'fs/promises';

(async () => {
    try {
        await fs.copyFile('./Snap.png', 'snap-copy.png');
    } catch (err) {
        console.log(err);
    }
})();
```

### Callback API

```js
    import fs from 'fs';

    fs.copyFile('./Snap.png', './copied.png', (err) => {
        if (err) console.log(err);
    });

```

### Synchronous API

```js
    import fs from 'fs';

    fs.copyFileSync('./Snap.png', './copied.png',);
```
